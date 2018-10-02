/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NodesActionTypes from './constants'
import * as Web3ActionTypes from '../middlewares/web3/constants'
// import * as NodesActions from './actions'
// import * as NodesSelectors from './selectors'
import initialState from './initialState'
import slicedWeb3Reducer from '../middlewares/web3/reducers'

const mutations = {

  [NodesActionTypes.NODES_NETWORK_SELECT]: (state, action) => {
    return {
      ...state,
      selected: state.availableNetworks[action.networkIndex],
    }
  },

  [NodesActionTypes.ETHEREUM_TOKEN_TRANSFER]: (state, action) => {
    return {
      ...state,
      tokens: {
        ...state.tokens,
        [action.symbol]: action.data,
      },
    }
  },

  [NodesActionTypes.WEB3_LISTENER_INCOMPATIBLE_NETWORK]: (state) => {
    return state
  },

  [Web3ActionTypes.WEB3_LISTENER_APPEND_CONTRACT]: (state, action) => {
    return {
      ...state,
      web3: {
        ...state.web3,
        web3Listener: slicedWeb3Reducer(state.web3.web3Listener, action),
      },
    }
  },

}

export default (state = initialState, action) => {
  const type = action.type
  return (type in mutations)
    ? mutations[type](state, action)
    : state
}
