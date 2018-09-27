/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3 from 'web3'
import { Map } from 'immutable'
import ERC20DAODefaultABI from './abi/ERC20DAODefaultABI'
import BigNumber from 'bignumber.js'
import web3utils from 'web3/lib/utils/utils'
import * as Utils from './abi/utils'
import ContractList from './abi'
import * as NodesActionTypes from '../../nodes/constants'
import * as NodesActions from '../../nodes/actions'
import * as NodesThunks from '../../nodes/thunks'
import * as NodesSelectors from '../../nodes/selectors'

let w3c = null

class Web3Controller {
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
    this.syncInterval = 5000 // 5 seconds
    this.contracts = new Map()
    this.networkId = networkId
    this.tokens = new Map()
  }

  initController () {
    this.provider = new Web3.providers.WebsocketProvider(this.host)
    this.provider.on('connect', () => {
      this.web3 = new Web3(this.provider)
      console.log('This web3:', this.web3)
      this.startSyncingMonitor()
      // console.log(this)
      this.initContracts()
      this.dispatch(NodesActions.primaryNodeConnected(this.host))
    })
    this.provider.on('error', (e) => {
      this.dispatch(NodesActions.primaryNodeError(this.host, e))
    })
    this.provider.on('end', (e) => {
      this.stopSyncingMonitor(this.dispatch)
      this.dispatch(NodesActions.primaryNodeDisconnected(this.host, e))
    })
  }

  initTokenContract (tokenSymbol, tokenAddress) {
    this.tokens = this.tokens.set(tokenSymbol, new this.web3.eth.Contract(ERC20DAODefaultABI.abi, tokenAddress))
  }

  unsubscribeFromTokenEvents () {
    this.tokens.forEach((tokenContract) => {
      tokenContract.clearSubscriptions()
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
              console.log(tokenSymbol, eventType, data)
              break
            }
            case 'approval': {
              // eslint-disable-next-line no-console
              console.log(tokenSymbol, eventType, data)
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

  changeProvider (host, networkId) {
    this.unsubscribeFromTokenEvents()
    this.stopSyncingMonitor(this.dispatch)
    this.tokens = null
    this.contracts = null
    this.disconnect()
    this.host = host
    this.networkId = networkId
    this.provider = null
    this.web3 = null
    this.initController()
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
    const contractNameList = Object.keys(ContractList)
    contractNameList.forEach((contractObjectName) => {
      const contract = ContractList[contractObjectName]
      const abi = contract.abi
      try {
        const address = Utils.getContractAddressByNetworkId(contract.networks, this.networkId)
        this.contracts = this.contracts.set(contract.contractName, new this.web3.eth.Contract(abi, address))
      } catch (error) {
        // console.log(error)
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
    this.dispatch(NodesActions.primaryNodeSyncingStatusStop())
  }

  checkSyncStatus () {
    // TODO: Need to clarify algorythm and what to do case of errors
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

const mutations = {

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  // [NodesActionTypes.NODES_PRIMARY_NODE_SET_EXTERNAL_PROVIDER]: (store, payload) => {
  //   w3.currentProvider.connection.close()
  //   w3 = payload.w3
  //   w3.setProvider(payload.provider)
  // },

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_SYNC_STATUS_STOP]: () => {
    w3c.stopSyncTimer()
  },

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_GET_WEB3]: () => w3c.getWeb3Instance(),

  /**
   * Returns currently used web3 provider instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_GET_WEB3_PROVIDER]: () => w3c.getWeb3CurrentProvider(),

  /**
   * Must be called on App start. Connecting to selected primary Ethereum node
   */
  [NodesActionTypes.NODES_INIT]: async (store) => {
    let state = store.getState()
    if (!state.nodes.selected) {
      await store.dispatch(NodesThunks.preselectNetwork())
      state = store.getState()
    }
    const networkId = NodesSelectors.selectCurrentNetworkId(state)
    w3c = new Web3Controller(store.dispatch, NodesSelectors.selectCurrentPrimaryNode(state).ws, networkId.toString())
    w3c.initController()
    return Promise.resolve(w3c.getWeb3Instance())
  },

  /**
   * Replace web3 provider to another one
   * TODO: Need to disconnect/reconnect contracts etc.
   */
  [NodesActionTypes.NODES_NETWORK_SWITCH]: (store) => {
    const state = store.getState()
    const selectedWeb3Host = NodesSelectors.selectCurrentPrimaryNode(state)
    const selectedProviderUrl = selectedWeb3Host && selectedWeb3Host.ws
    if (!w3c || !selectedProviderUrl) {
      store.dispatch(NodesActions.nodesInit())
    } else {
      const w3cProviderHost = w3c.getWeb3CurrentProvider().connection.url
      if (w3cProviderHost !== selectedProviderUrl) {
        w3c.changeProvider(selectedProviderUrl, NodesSelectors.selectCurrentNetworkId(state))
      }
    }
  },

}

export default (store) => (next) => (action) => {
  const { type, ...payload } = action
  return (action.type in mutations)
    ? mutations[type](store, payload)
    : next(action)
}
