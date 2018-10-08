/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { REHYDRATE } from 'redux-persist'
import initialState from './initialState'
import * as ActionTypes from './constants'

const bitcoinRehydrate = (state, payload) => {
  // action.payload is undefined if LocalStorage is empty
  // See https://github.com/rt2zz/redux-persist/issues/719
  if (!payload.payload || payload.key !== ActionTypes.DUCK_BITCOIN) {
    return state
  }
  return {
    ...state,
    wallets: payload.payload.wallets,
  }
}

const createBitcoinWallet = (state, payload) => ({
  ...state,
  wallets: {
    ...state.wallets,
    [payload.ethereumAddress]: {
      [payload.wallet.address]: payload.wallet,
    },
  },
})

const mutations = {
  [REHYDRATE]: bitcoinRehydrate,
  [ActionTypes.BITCOIN_WALLET_CREATE]: createBitcoinWallet,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
