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
      contracts: {
        ...state.contracts,
        list: [...state.contracts.list, payload.contractName],
      },
    }
  },

}

export default (state = initialState, { type, ...payload }) => {
  console.log('\n\nSliced reducer')
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
