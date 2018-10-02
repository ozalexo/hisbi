/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NodesActionTypes from './constants'
// import * as NodesActions from './actions'
// import * as NodesSelectors from './selectors'
import initialState from './initialState'
import { mutations as web3Mutations } from '../middlewares/web3/reducers'

const mutations = {

  [NodesActionTypes.NODES_NETWORK_SELECT]: (state, { networkIndex }) => {
    return {
      ...state,
      selected: state.availableNetworks[networkIndex],
    }
  },

  [NodesActionTypes.ETHEREUM_TOKEN_TRANSFER]: (state, {symbol, data}) => {
    return {
      ...state,
      tokens: {
        ...state.tokens,
        [symbol]: data,
      },
    }
  },

  [NodesActionTypes.WEB3_LISTENER_INCOMPATIBLE_NETWORK]: (state) => {
    return state
  },

}

const joinedMutations = {
  ...mutations,
  ...web3Mutations,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in joinedMutations)
    ? joinedMutations[type](state, payload)
    : state
}
