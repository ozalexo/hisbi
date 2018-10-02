/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import initialState from './initialState'
// import * as Actions from './actions'

export const mutations = {

  [ActionTypes.WEB3_LISTENER_APPEND_CONTRACT]: (state, payload) => {
    console.log(state)
    return {
      ...state,
      web3: {
        ...state.web3,
        web3Listener: {
          ...state.web3.web3Listener,
          contracts: {
            ...state.web3.web3Listener.contracts,
            list: [...state.web3.web3Listener.contracts.list, payload.contractName],
          },
        },
      },
    }
  },

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
