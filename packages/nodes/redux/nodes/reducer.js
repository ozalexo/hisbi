/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NodesActionTypes from './constants'
// import * as Web3ActionTypes from '../middlewares/web3/constants'
// import * as NodesActions from './actions'
// import * as NodesSelectors from './selectors'
import initialState from './initialState'
import web3ListenerReducer, { mutations as web3ListenerMutations } from '../middlewares/web3/reducers'

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

const web3ListenerReset = (state, action) => {
  return {
    ...state,
    web3: web3ListenerReducer(state.web3, action),
  }
}

const mutations = {
  [NodesActionTypes.ETHEREUM_TOKEN_TRANSFER]: ethereumTokenTransfer,
  [NodesActionTypes.NODES_NETWORK_SELECT]: networkSelect,
  [NodesActionTypes.WEB3_LISTENER_RESET]: web3ListenerReset,
}

export default (state = initialState, action) => {
  const type = action.type
  if (type in web3ListenerMutations) {
    return {
      ...state,
      web3: {
        ...state.web3,
        web3Listener: web3ListenerReducer(state.web3.web3Listener, action),
      },
    }
  }
  return (type in mutations)
    ? mutations[type](state, action)
    : state
}
