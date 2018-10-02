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
    this.syncTimer = null
    this.requiredTokens = []
    this.syncInterval = 5000 // 5 seconds
    this.contracts = new Map()
    this.networkId = networkId
    this.tokens = new Map()
    this.isReconnectRequired = true
  }

  initController (provider) {
    this.provider = provider || new Web3.providers.WebsocketProvider(this.host)
    this.provider.on('connect', () => {
      this.web3 = new Web3(this.provider)
      this.web3.eth.net
        .getId()
        .then((netId) => {
          if (netId === 1 || netId === 4) {
            this.startSyncingMonitor()
            this.initContracts()
            this.subscribeOnContractsEvents()
            this.dispatch(NodesActions.primaryNodeConnected(this.host))
          } else {
            this.disconnect()
            this.web3 = null
            this.provider = null
            this.dispatch(NodesActions.primaryNodeIncompatibleNetwork(netId))
          }
        })
    })
    this.provider.on('error', (e) => {
      this.dispatch(NodesActions.primaryNodeError(this.host, e))
    })
    this.provider.on('end', (e) => {
      this.resetTokens()
      this.resetContracts()
      this.dispatch(NodesActions.primaryNodeSyncingStatusStop())
      this.dispatch(NodesActions.primaryNodeDisconnected(this.host, e))
      // if (this.isReconnectRequired) {

      // }
    })
  }

  initTokenContract (tokenSymbol, tokenAddress) {
    this.tokens = this.tokens.set(tokenSymbol, new this.web3.eth.Contract(ERC20DAODefaultABI.abi, tokenAddress))
  }

  unsubscribeFromAllEvents () {
    this.tokens && this.tokens.forEach((tokenContract) => {
      try {
        tokenContract.clearSubscriptions()
      } catch (error) {
        console.log('Error clearing token subscriptions:', error)
      }
    })
    this.contracts && this.contracts.forEach((contract) => {
      try {
        contract && contract.clearSubscriptions()
      } catch (error) {
        console.log('Error clearing contract subscriptions:', error)
      }
    })
  }

  subscribeOnTokenEvents () {
    this.tokens.forEach((tokenContract, tokenSymbol) => {
      if (!tokenContract.events) {
        return
      }
      tokenContract.events
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
    })
  }

  subscribeOnContractsEvents () {
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
  }

  changeProvider (host, networkId) {
    this.unsubscribeFromAllEvents()
    this.stopSyncingMonitor(this.dispatch)
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
            gwei: web3utils.fromWei(bnGasPrice, 'gwei')
          },
          events: false
        }
        this.initTokenContract(model.symbol, model.address)
      })
      this.subscribeOnTokenEvents()
    } else {
      // eslint-disable-next-line no-console
      console.log('Contract not initialized.')
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

  startSyncingMonitor () {
    this.syncTimer = setInterval(() => this.checkSyncStatus(), this.syncInterval)
  }

  stopSyncingMonitor () {
    clearInterval(this.syncTimer)
    this.syncTimer = null
  }

  checkSyncStatus () {
    // TODO: Need to clarify algorythm and what to do in case of errors
    // See https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing
    this.web3.eth.isSyncing()
      .then((syncStatus) => {
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

  disconnect () {
    this.web3.currentProvider.connection.close()
  }
}
