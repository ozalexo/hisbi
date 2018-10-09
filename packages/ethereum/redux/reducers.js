/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const infoReducer = (state) => state

const ethAppendTokensList = (state, { token }) => ({
  ...state,
  tokens: {
    ...state.tokens,
    token,
  },
})

const walletCreateSuccess = (state, payload) => ({
  ...state,
  wallets: {
    ...state.wallets,
    [payload.wallet.address]: {
      ...payload.wallet,
      transactions: {
        list: {},
        pending: {},
      },
    },
  },
})

const walletCreateFailure = (state) => state

const mutations = {
  [ActionTypes.ETHEREUM_TOKENS_APPEND_LIST]: ethAppendTokensList,
  [ActionTypes.ETHEREUM_WALLET_CREATE]: infoReducer,
  [ActionTypes.ETHEREUM_WALLET_CREATE_SUCCESS]: walletCreateSuccess,
  [ActionTypes.ETHEREUM_WALLET_CREATE_FAILURE]: walletCreateFailure,
  [ActionTypes.ETHEREUM_DECRYPT_WALLET_GET_PK_SUCCESS]: infoReducer,
  [ActionTypes.ETHEREUM_DECRYPT_WALLET_GET_PK_FAILURE]: infoReducer,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
