/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { REHYDRATE } from 'redux-persist'

const initialState = {
  selected: null,
  list: []
}

const mutations = {

  [REHYDRATE]: (state, payload) => {
    console.log('A', state, payload)
    // action.payload is undefined if LocalStorage is empty
    // See https://github.com/rt2zz/redux-persist/issues/719
    if (!payload.payload) {
      console.log('Returning state')
      return state
    }
    console.log('B', state, payload)
    return {
      ...state,
      selected: null,
      list: payload.payload.list
    }
  }

  // [persistAccountActionTypes.PERSIST_ACCOUNT_SIGNATURES_LOADING]: (state) => ({
  //   ...state,
  //   isLoadingSignatures: true
  // }),

}

export default (state = initialState, { type, ...payload }) => {
  console.log('Type:', type, type in mutations)
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
