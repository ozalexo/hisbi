/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NodesActionTypes from './constants'
import * as Web3ActionTypes from '../middlewares/web3/constants'
// import * as NodesActions from './actions'
// import * as NodesSelectors from './selectors'
import initialState from './initialState'
import web3ListenerReducer from '../middlewares/web3/reducers'

const networkSelect = (state, action) => {
  return {
    ...state,
    selected: state.availableNetworks[action.networkIndex],
  }
}

const ethereumTokenTransfer = (state, action) => {
  return {
    ...state,
    tokens: {
      ...state.tokens,
      [action.symbol]: action.data,
    },
  }
}

const incompatibleNetworkType = (state) => {
  return state
}

const web3ListenerReset = (state, action) => {
  return {
    ...state,
    web3: web3ListenerReducer(state.web3, action),
  }
}

const web3ListenerAppendContract = (state, action) => {
  return {
    ...state,
    web3: {
      ...state.web3,
      web3Listener: web3ListenerReducer(state.web3.web3Listener, action),
    },
  }
}

const mutations = {
  [NodesActionTypes.ETHEREUM_TOKEN_TRANSFER]: ethereumTokenTransfer,
  [NodesActionTypes.NODES_NETWORK_SELECT]: networkSelect,
  [NodesActionTypes.WEB3_LISTENER_INCOMPATIBLE_NETWORK]: incompatibleNetworkType,
  [NodesActionTypes.WEB3_LISTENER_RESET]: web3ListenerReset,
  [Web3ActionTypes.WEB3_LISTENER_APPEND_CONTRACT]: web3ListenerAppendContract,
}

export default (state = initialState, action) => {
  const type = action.type
  return (type in mutations)
    ? mutations[type](state, action)
    : state
}
