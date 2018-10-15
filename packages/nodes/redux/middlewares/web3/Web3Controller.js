/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3 from 'web3'
import { Map } from 'immutable'
import ERC20DAODefaultABI from './abi/ERC20DAODefaultABI'
// import TokenManagementInterfaceABI from 'chronobank-smart-contracts/build/contracts/TokenManagementInterface.json'
import BigNumber from 'bignumber.js'
import web3utils from 'web3/lib/utils/utils'
import * as Utils from './abi/utils'
import ContractList from './abi'
import * as NodesActions from '../../nodes/actions'
import * as Web3ListenerActions from './actions'

export default class Web3Controller {
  constructor (
    dispatch,
    host,
    networkId,
  ) {
    this.dispatch = dispatch
    this.host = host
    this.provider = null
    this.web3 = null
    this.syncing = null
    this.requiredTokens = []
    this.contracts = new Map()
    this.networkId = networkId
    this.tokens = new Map()
    this.isReconnectRequired = true
    this.tokenSubscriptions = []
    this.contractSubscriptions = []
    this.syncStatusSubscription = null
  }

  initController (provider) {
    try {
      this.provider = provider || new Web3.providers.WebsocketProvider(this.host)
      this.provider.on('connect', () => {
        this.web3 = new Web3(this.provider)
        this.web3.eth.net
          .getId()
          .then((netId) => {
            console.log('NetId:', netId)
            if (netId === 1 || netId === 4) {
              this.dispatch(NodesActions.primaryNodeConnected(this.host))
              this.checkSyncStatus()
              this.initContracts()
              this.subscribeOnContractsEvents()
            } else {
              this.disconnect()
              this.web3 = null
              this.provider = null
              this.dispatch(NodesActions.primaryNodeIncompatibleNetwork(netId))
            }
          })
      })
      this.provider.on('error', (error) => {
        this.dispatch(NodesActions.primaryNodeError(this.host, error))
      })
      this.provider.on('end', (error) => {
        if (!this.web3 || this.web3.currentProvider.connection.url !== error.currentTarget.url) {
          return
        }
        this.resetTokens()
        this.resetContracts()
        this.dispatch(NodesActions.primaryNodeDisconnected(this.host, error))
        // if (this.isReconnectRequired) {

        // }
      })
    } catch (error) {
      this.dispatch(NodesActions.primaryNodeError(this.host, error))
    }
  }

  initTokenContract (tokenSymbol, tokenAddress) {
    this.tokens = this.tokens.set(tokenSymbol, new this.web3.eth.Contract(ERC20DAODefaultABI.abi, tokenAddress))
  }

  unsubscribeFromAllEvents () {
    this.tokenSubscriptions && this.tokenSubscriptions.forEach((subscription) => {
      try {
        subscription.removeAllListeners && subscription.removeAllListeners()
      } catch (error) {
        console.log('Error clearing token subscriptions:', error)
      }
    })
    this.contractSubscriptions && this.contractSubscriptions.forEach((subscription) => {
      try {
        subscription.removeAllListeners && subscription.removeAllListeners()
      } catch (error) {
        console.log('Error clearing contract subscriptions:', error)
      }
    })
    this.syncStatusSubscription && this.syncStatusSubscription.removeAllListeners()
    // this.web3.eth.clearSubscriptions()
    this.syncStatusSubscription = null
    this.tokenSubscriptions = []
    this.contractSubscriptions = []
  }

  subscribeOnTokenEvents () {
    this.tokens.forEach((tokenContract, tokenSymbol) => {
      if (!tokenContract.events) {
        return
      }
      this.tokenSubscriptions.push(tokenContract.events
        .allEvents({})
        .on('data', (data) => {
          if (!data || !data.event) {
            return
          }
          const eventType = data.event.toLowerCase()
          switch (eventType) {
          case 'transfer': {
            // eslint-disable-next-line no-console
            console.log('Token %s event \'%s\':', tokenSymbol, eventType, data)
            if (this.requiredTokens.length === 0 || this.requiredTokens.includes(tokenSymbol)) {
              this.dispatch(NodesActions.tokenTransfer(tokenSymbol, data))
            }
            break
          }
          case 'approval': {
            // eslint-disable-next-line no-console
            console.log('Token %s event \'%s\':', tokenSymbol, eventType, data)
            break
          }
          }
        })
        .on('error', (error) => {
          // eslint-disable-next-line no-console
          console.log(`Error of token ${tokenSymbol}\n`, error)
        })
      )
    })
  }

  subscribeOnContractsEvents () {
    this.contractSubscriptions.push(
      this.contracts.forEach((contract, contractName) => {
        // eslint-disable-next-line no-underscore-dangle
        if (!contract.events || !contract._address) {
          return
        }
        contract.events
          .allEvents({})
          .on('data', (data) => {
            if (!data || !data.event) {
              return
            }
            console.log('Contract %s event:', contractName, data)
          })
          .on('error', (error) => {
            // eslint-disable-next-line no-console
            console.log('Error of contract %s', contractName, error)
          })
      })
    )
  }

  changeProvider (host, networkId) {
    this.unsubscribeFromAllEvents()
    this.tokens = new Map()
    this.contracts = new Map()
    this.disconnect()
    this.host = host
    this.networkId = networkId
    this.provider = null
    this.web3 = null
    this.initController()
  }

  resetTokens () {
    this.unsubscribeFromAllEvents()
    this.tokens = new Map()
  }

  resetContracts () {
    this.contracts = new Map()
  }

  getContractByName (contractName) {
    return this.contracts[contractName]
  }

  getTokenContractByName (tokenContractName) {
    return this.tokens[tokenContractName]
  }

  async loadTokens () {
    const Erc20Manager = this.contracts.get('ERC20Manager')
    if (Erc20Manager) {
      const res = await Erc20Manager.methods.getTokens([]).call()
      /* eslint-disable no-underscore-dangle */
      const addresses = res._tokensAddresses
      const names = res._names
      const symbols = res._symbols
      const urls = res._urls
      const decimalsArr = res._decimalsArr
      const ipfsHashes = res._ipfsHashes
      /* eslint-enable no-underscore-dangle */
      const gasPrice = await this.web3.eth.getGasPrice()
      const bnGasPrice = new BigNumber(gasPrice)
      addresses.forEach((address, i) => {
        const model = {
          address: address.toLowerCase(),
          name: web3utils.toUtf8(names[i]),
          symbol: web3utils.toUtf8(symbols[i]).toUpperCase(),
          url: web3utils.toUtf8(urls[i]),
          decimals: parseInt(decimalsArr[i]),
          icon: Utils.bytes32ToIPFSHash(ipfsHashes[i]),
          feeRate: {
            wei: bnGasPrice,
            gwei: web3utils.fromWei(bnGasPrice, 'gwei'),
          },
          events: false,
        }
        this.initTokenContract(model.symbol, model.address)
      })
      this.subscribeOnTokenEvents()
    } else {
      // eslint-disable-next-line no-console
      console.log('Contract Erc20Manager is not initialized.')
    }
  }

  initContracts () {
    const abstractContracts = [
      'ChronoBankPlatformEmitterABI',
      'FeeInterfaceABI',
      'PlatformTokenExtensionGatewayManagerEmitterABI',
      'PollEmitterABI',
      'PollInterfaceABI',
      'WalletABI',
    ]
    const contractNameList = Object.keys(ContractList)
    contractNameList.forEach((contractObjectName) => {
      const contract = ContractList[contractObjectName]
      const abi = contract.abi
      try {
        const address = Utils.getContractAddressByNetworkId(contract.networks, this.networkId, contractObjectName)
        this.contracts = this.contracts.set(contract.contractName, new this.web3.eth.Contract(abi, address))
        // console.log(contractObjectName, address)
        this.dispatch(Web3ListenerActions.appendContract(contractObjectName))
      } catch (error) {
        if (abstractContracts.includes(contractObjectName)) {
          this.contracts.set(contract.contractName, (address) => new this.web3.eth.Contract(abi, address))
          this.dispatch(Web3ListenerActions.appendContract(contractObjectName))
        } else {
          // TODO: to handle possible errors
          // eslint-disable-next-line no-console
          console.log(error.message)
        }
      }
    })
    this.loadTokens()
  }

  getWeb3Instance () {
    return this.web3
  }

  getWeb3CurrentProvider () {
    return this.web3.currentProvider
  }

  // TODO: see https://web3js.readthedocs.io/en/1.0/web3-eth-subscribe.html?highlight=clearSubscriptions#subscribe-syncing
  checkSyncStatus () {
    // TODO: Need to clarify algorythm and what to do in case of errors
    // See https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing
    const requestSyncState = () => {
      this.web3.eth.isSyncing()
        .then((syncStatus) => {
          console.log('Manual checking node status:', syncStatus)
          if (syncStatus === true) {
            const syncingComplete = false
            const progress = 0
            this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
          } else {
            if (syncStatus) {
              const syncingComplete = false
              const progress = (syncStatus.currentBlock - syncStatus.startingBlock) / (syncStatus.highestBlock - syncStatus.startingBlock)
              this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
            } else {
              const syncingComplete = true
              const progress = 1
              this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
            }
          }
        })
        .catch((error) => {
          const syncingInProgress = true
          const progress = 0
          this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingInProgress, progress))
          // eslint-disable-next-line no-console
          console.log('Set SIP, progress 0', error)
        })
    }
    requestSyncState()
    this.syncStatusSubscription = this.web3.eth
      .subscribe('syncing')
      .on('data', (data) => { console.log('SYNC data:', data); requestSyncState() })
      .on('changed', (changed) => { console.log('SYNC changed:', changed) })
      .on('error', (error) => { console.log('SYNC error:', error) })
  }

  disconnect () {
    // TODO: in web3 1.0.0-beta.36 provider has method 'disconnect'
    // See https://github.com/ethereum/web3.js/commit/72443142713ff904c6e4bdbe6b19883cc6dad408
    this.web3.currentProvider.connection.close()
  }
}
