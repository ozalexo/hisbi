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
      [payload.wallet.address]: {
        ...payload.wallet,
        transactions: {
          list: {},
          pending: {},
        },
      },
    },
  },
})

const prepareSendTransaction = (state, payload) => ({
  ...state,
  prepareSendTransaction: {
    to: '',
    from: payload.from,
    amount: null,
    fee: null,
    rawTx: null,
    signedRawTx: null,
    error: null,
  },
})

const cancelSendTransaction= (state) => ({
  ...state,
  prepareSendTransaction: null,
})

const signPreparedTransaction = (state, payload) => ({
  ...state,
  prepareSendTransaction: {
    ...state.prepareSendTransaction,
    signedRawTx: payload.signedRawTx,
  },
})

const sendTransaction = (state) => state

const selectWallet = (state, payload) => ({
  ...state,
  selectedWallet: state.wallets[payload.address],
})

const resetSelectWallet = (state) => ({
  ...state,
  selectedWallet: null,
})

// TODO: need to report send state into redux store, it must be used by UI
const sendTransactionSuccess = (state) => state

const sendTransactionFailure = (state, payload) => ({
  ...state,
  prepareSendTransaction: {
    ...state.prepareSendTransaction,
    error: payload.error,
  },
})

const mutations = {
  [REHYDRATE]: bitcoinRehydrate,

  [ActionTypes.BITCOIN_CANCEL_SEND_TRANSACTION]: cancelSendTransaction,
  [ActionTypes.BITCOIN_PREPARE_SEND_TRANSACTION]: prepareSendTransaction,
  [ActionTypes.BITCOIN_RESET_SELECT_WALLET]: resetSelectWallet,
  [ActionTypes.BITCOIN_SELECT_WALLET]: selectWallet,
  [ActionTypes.BITCOIN_SEND_TRANSACTION_FAILURE]: sendTransactionFailure,
  [ActionTypes.BITCOIN_SEND_TRANSACTION_SUCCESS]: sendTransactionSuccess,
  [ActionTypes.BITCOIN_SEND_TRANSACTION]: sendTransaction,
  [ActionTypes.BITCOIN_SIGN_PREPARED_TRANSACTION]: signPreparedTransaction,
  [ActionTypes.BITCOIN_WALLET_CREATE]: createBitcoinWallet,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
