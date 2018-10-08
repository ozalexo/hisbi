/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

const initialState = {
  authProcessing: false,
  isLoggedIn: false,
  error: null,
  currentAuthType: null,
  authTypes: [
    {
      type: 'MetaMask',
      enabled: true,
    },
    {
      type: 'WalletFile',
      enabled: true,
    },
    {
      type: 'TrezorDevice',
      enabled: true,
    },
    {
      type: 'LedgerDevice',
      enabled: true,
    },
    {
      type: 'Mnemonic',
      enabled: true,
    },
    {
      type: 'PrivateKey',
      enabled: true,
    },
  ],
}

const userAuthProcessing = (state) => ({
  ...state,
  authProcessing: true,
})

const userLogin = (state) => ({
  ...state,
})

const userLoginSuccess = (state) => ({
  ...state,
  authProcessing: false,
  isLoggedIn: true,
  error: null,
})

const userLoginFailure = (state, payload) => ({
  ...state,
  authProcessing: false,
  isLoggedIn: false,
  error: payload.error,
})

const mutations = {

  [ActionTypes.USER_AUTH_PROCESSING]: userAuthProcessing,
  [ActionTypes.USER_LOGIN]: userLogin,
  [ActionTypes.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [ActionTypes.USER_LOGIN_FAILURE]: userLoginFailure,
  [ActionTypes.USER_LOGOUT]: userAuthProcessing,
  [ActionTypes.USER_LOGOUT_SUCCESS]: userAuthProcessing,
  [ActionTypes.USER_LOGOUT_FAILURE]: userAuthProcessing,
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
