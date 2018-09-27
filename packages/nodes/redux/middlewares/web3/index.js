/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3 from 'web3'
import web3WSProviderFactory from './Web3WSProviderFactory'
import web3Factory from './Web3Factory'
import * as NodesActionTypes from '../../nodes/constants'
import * as NodesActions from '../../nodes/actions'
import * as NodesThunks from '../../nodes/thunks'
import * as NodesSelectors from '../../nodes/selectors'

let w3 = null
let availableProviders = null
let syncIntervalId = null // Using to check if node is syncing

class Web3Controller {
  constructor (
    dispatch,
    host,
  ) {
    this.dispath = dispatch
    this.host = host
    this.provider = null
    this.web3 = null
    this.syncTimer = null
    this.syncInterval = 5000 // 5 seconds
  }

  initController = () => {
    this.provider = new Web3.providers.WebsocketProvider(this.host)
    this.provider.on('connect', () => {
      this.web3 = new Web3(this.provider)
      this.startSyncingMonitor()
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

  startSyncingMonitor = () => {
    this.syncTimer = setInterval(this.checkSyncStatus, this.syncInterval)
  }

  stopSyncingMonitor = () => {
    clearInterval(this.syncTimer)
    this.dispatch(NodesActions.primaryNodeSyncingStatusStop())
  }

  checkSyncStatus = () => {
    // TODO: Need to clarify algorythm and what to do case of errors
    // See https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing
    w3.eth.isSyncing()
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
}

// // TODO: Need to clarify algorythm and what to do case of errors
// const checkIfSyncing = (dispatch) => {
//   // See https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing
//   w3.eth.isSyncing()
//     .then((syncStatus) => {
//       if (syncStatus === true) {
//         const syncingComplete = false
//         const progress = 0
//         dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
//       } else {
//         if (syncStatus) {
//           const syncingComplete = false
//           const progress = (syncStatus.currentBlock - syncStatus.startingBlock) / (syncStatus.highestBlock - syncStatus.startingBlock)
//           dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
//         } else {
//           const syncingComplete = true
//           const progress = 1
//           dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
//         }
//       }
//     })
//     .catch((error) => {
//       const syncingInProgress = true
//       const progress = 0
//       dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingInProgress, progress))
//       // eslint-disable-next-line no-console
//       console.log('Set SIP, progress 0', error)

//     })
// }

// const startSyncTimer = (dispatch) => {
//   syncIntervalId = setInterval(() => checkIfSyncing(dispatch), 5000)
// }

// const stopSyncTimer = (dispatch) => {
//   clearInterval(syncIntervalId)
//   dispatch(NodesActions.primaryNodeSyncingStatusStop())
// }

// /**
//  * Creating web3 provider and subscribing for web-socket's events
//  * @param {string} url
//  * @param {*} store Redux store
//  */
// const getProvider = (host, dispatch) => web3WSProviderFactory(
//   host,
//   // onconnect
//   () => {
//     startSyncTimer(dispatch)
//     dispatch(NodesActions.primaryNodeConnected(host))
//   },
//   // onerror
//   (e) => dispatch(NodesActions.primaryNodeError(host, e)),
//   // onend
//   (e) => {
//     stopSyncTimer(dispatch)
//     dispatch(NodesActions.primaryNodeDisconnected(host, e))
//   }
// )

const mutations = {

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_SET_EXTERNAL_PROVIDER]: (store, payload) => {
    w3.currentProvider.connection.close()
    w3 = payload.w3
    w3.setProvider(payload.provider)
  },

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_SYNC_STATUS_STOP]: (store) => {
    stopSyncTimer(store.dispatch)
  },

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_GET_WEB3]: () => w3,

  /**
   * Returns currently used web3 provider instance (Only for refactoring purposes, to be deleted in the future)
   */
  [NodesActionTypes.NODES_PRIMARY_NODE_GET_WEB3_PROVIDER]: () =>
    availableProviders[w3.currentProvider.connection.url],

  /**
   * Must be called on App start. Connecting to selected primary Ethereum node
   */
  [NodesActionTypes.NODES_INIT]: async (store) => {
    let state = store.getState()
    if (!availableProviders) {
      availableProviders = NodesSelectors.selectAvailableProviders(state)
        .reduce((accumulator, providerUrl) => {
          accumulator[providerUrl] = null
          return accumulator
        }, {})
      await store.dispatch(NodesThunks.preselectNetwork())
    }
    state = store.getState()
    const currentPrimaryNode = NodesSelectors.selectCurrentPrimaryNode(state)
    const currentProviderUrl = currentPrimaryNode.ws
    if (!w3 || !availableProviders[currentProviderUrl]) {
      const currentPrimaryNode = NodesSelectors.selectCurrentPrimaryNode(state)
      const currentProviderUrl = currentPrimaryNode.ws

      const w3Provider = getProvider(currentProviderUrl, store.dispatch)
      console.log(w3Provider)
      availableProviders[currentProviderUrl] = w3Provider
      // w3 = new Web3(w3Provider)
      w3 = new Web3Controller(dispatch, currentProviderUrl)
      return Promise.resolve(w3)
    } else {
      return Promise.resolve(w3)
    }
  },

  /**
   * Replace web3 provider to another one
   * TODO: Need to disconnect/reconnect contracts etc.
   */
  [NodesActionTypes.NODES_NETWORK_SWITCH]: (store) => {
    const state = store.getState()
    const currentPrimaryNode = NodesSelectors.selectCurrentPrimaryNode(state)
    const currentProviderUrl = currentPrimaryNode && currentPrimaryNode.ws
    if (!currentProviderUrl || !availableProviders || !availableProviders[currentProviderUrl] || !w3) {
      store.dispatch(NodesActions.nodesInit())
    } else {
      const w3ProviderHost = w3.currentProvider.connection.url
      if (w3ProviderHost !== currentProviderUrl) {
        w3.currentProvider.connection.close()
        const w3Provider = getProvider(currentProviderUrl, store.dispatch)
        availableProviders[currentProviderUrl] = w3Provider
        w3.setProvider(w3Provider)
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
