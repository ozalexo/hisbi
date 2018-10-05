/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import initialState from './initialState'
// import * as Actions from './actions'

const web3ListenerAppendContract = (state, payload) => {
  return {
    ...state,
    contracts: {
      ...state.contracts,
      list: [...state.contracts.list, payload.contractName],
    },
  }
}

const web3ListenerReset = () => {
  return initialState
}

export const mutations = {

  [ActionTypes.WEB3_LISTENER_APPEND_CONTRACT]: web3ListenerAppendContract,
  [ActionTypes.WEB3_LISTENER_RESET]: web3ListenerReset,

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
