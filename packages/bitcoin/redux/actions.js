/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const createWalletByPrivateKey = (wallet, ethereumAddress) => ({
  type: ActionTypes.BITCOIN_WALLET_CREATE,
  ethereumAddress,
  wallet,
})

export const createWalletByMnemonicSuccess = (wallet) => ({
  type: ActionTypes.BITCOIN_WALLET_CREATE_SUCCESS,
  wallet,
})

export const createWalletByMnemonicFailure = (error) => ({
  type: ActionTypes.BITCOIN_WALLET_CREATE_FAILURE,
  error,
})

export const cancelSendTransaction = () => ({
  type: ActionTypes.BITCOIN_CANCEL_SEND_TRANSACTION,
})

export const prepareSendTransaction = () => ({
  type: ActionTypes.BITCOIN_PREPARE_SEND_TRANSACTION,
})

export const signPreparedTransaction = (rawTx) => ({
  type: ActionTypes.BITCOIN_SIGN_PREPARED_TRANSACTION,
  rawTx,
})

export const sendTransaction = (signedRawTx) => ({
  type: ActionTypes.BITCOIN_SEND_TRANSACTION,
  signedRawTx,
})

export const selectWallet = (walletAddress) => ({
  type: ActionTypes.BITCOIN_SELECT_WALLET,
  walletAddress,
})

export const resetSelectWallet = () => ({
  type: ActionTypes.BITCOIN_RESET_SELECT_WALLET,
})

export const signTransactionFailure = (error) => ({
  type: ActionTypes.BITCOIN_SIGN_TRANSACTION_FAILURE,
  error,
})

export const signTransactionSuccess = (signedRawTx) => ({
  type: ActionTypes.BITCOIN_SIGN_TRANSACTION_SUCCESS,
  signedRawTx,
})

export const sendTransactionFailure = (error) => ({
  type: ActionTypes.BITCOIN_SEND_TRANSACTION_FAILURE,
  error,
})

export const sendTransactionSuccess = () => ({
  type: ActionTypes.BITCOIN_SEND_TRANSACTION_SUCCESS,
})
