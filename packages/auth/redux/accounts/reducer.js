/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { REHYDRATE } from 'redux-persist'
import * as ActionTypes from './constants'
import initialState from './initialState'

const accountsRehydrate = (state, payload) => {
  // action.payload is undefined if LocalStorage is empty
  // See https://github.com/rt2zz/redux-persist/issues/719
  if (!payload.payload || payload.key !== ActionTypes.DUCK_ACCOUNTS) {
    return state
  }
  return {
    ...state,
    selected: null,
    list: payload.payload.list,
  }
}

const addInMemoryAccount = (state, payload) => ({
  ...state,
  list: {
    ...state.list,
    [payload.address]: {
      title: payload.accountTitle,
    },
  },
})

const selectAccount = (state, payload) => ({
  ...state,
  selected: payload.address,
})

const mutations = {

  [REHYDRATE]: accountsRehydrate,
  [ActionTypes.ACCOUNTS_ADD_IN_MEMORY_ACCOUNT]: addInMemoryAccount,
  [ActionTypes.ACCOUNTS_SELECT_ACCOUNT]: selectAccount,

  // [persistAccountActionTypes.PERSIST_ACCOUNT_SIGNATURES_LOADING]: (state) => ({
  //   ...state,
  //   isLoadingSignatures: true
  // }),

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
