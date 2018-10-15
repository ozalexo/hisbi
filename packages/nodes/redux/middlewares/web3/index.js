/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3Controller from './Web3Controller'
import * as NodesActionTypes from '../../nodes/constants'
import * as NodesActions from '../../nodes/actions'
import * as NodesThunks from '../../nodes/thunks'
import * as NodesSelectors from '../../nodes/selectors'

let w3c = null

const web3ListenerGetWeb3 = (store, action, next) => {
  next(action)
  return w3c.getWeb3Instance()
}

const web3ListenerGetWeb3Provider = (store, action, next) => {
  next(action)
  return w3c.getWeb3CurrentProvider()
}

const nodesInit = async (store, action, next) => {
  let state = store.getState()
  if (!state.nodes.selected) {
    await store.dispatch(NodesThunks.preselectNetwork())
    state = store.getState()
  }
  const networkId = NodesSelectors.selectCurrentNetworkId(state)
  w3c = new Web3Controller(store.dispatch, NodesSelectors.selectCurrentPrimaryNode(state).ws, networkId.toString())
  try {
    await w3c.initController()
    next(action)
    return Promise.resolve(w3c.getWeb3Instance())
  } catch (error) {
    return Promise.reject(error)
  }
}

const nodesNetworkSwitch = (store, action, next) => {
  store.dispatch(NodesActions.networkSelect(action.networkIndex))
  const state = store.getState()
  const selectedWeb3Host = NodesSelectors.selectCurrentPrimaryNode(state)
  const selectedProviderUrl = selectedWeb3Host && selectedWeb3Host.ws
  if (!w3c || !selectedProviderUrl) {
    store.dispatch(NodesActions.nodesInit())
  } else {
    const w3cProviderHost = w3c.getWeb3CurrentProvider().connection.url
    if (w3cProviderHost !== selectedProviderUrl) {
      store.dispatch(NodesActions.web3Reset())
      w3c.changeProvider(selectedProviderUrl, NodesSelectors.selectCurrentNetworkId(state))
    }
  }
  next(action)
}

const mutations = {

  /**
   * Returns currently used web3 instance (Only for refactoring purposes, to be deleted in the future)
   */
  // [NodesActionTypes.WEB3_LISTENER_SET_EXTERNAL_PROVIDER]: (store, payload) => {
  //   w3.currentProvider.connection.close()
  //   w3 = payload.w3
  //   w3.setProvider(payload.provider)
  // },

  [NodesActionTypes.WEB3_LISTENER_GET_WEB3]: web3ListenerGetWeb3,
  [NodesActionTypes.WEB3_LISTENER_GET_WEB3_PROVIDER]: web3ListenerGetWeb3Provider,
  [NodesActionTypes.NODES_INIT]: nodesInit,
  [NodesActionTypes.NODES_NETWORK_SWITCH]: nodesNetworkSwitch,

}

export default (store) => (next) => (action) => {
  const { type } = action
  return (type in mutations)
    ? mutations[type](store, action, next)
    : next(action)
}
