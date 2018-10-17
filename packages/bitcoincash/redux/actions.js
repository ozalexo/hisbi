/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const createWalletByPrivateKey = (wallet, ethereumAddress) => ({
  type: ActionTypes.BITCOINCASH_WALLET_CREATE,
  ethereumAddress,
  wallet,
})

export const createWalletByMnemonicSuccess = (wallet) => ({
  type: ActionTypes.BITCOINCASH_WALLET_CREATE_SUCCESS,
  wallet,
})

export const createWalletByMnemonicFailure = (error) => ({
  type: ActionTypes.BITCOINCASH_WALLET_CREATE_FAILURE,
  error,
})

export const cancelSendTransaction = () => ({
  type: ActionTypes.BITCOINCASH_CANCEL_SEND_TRANSACTION,
})

export const prepareSendTransaction = () => ({
  type: ActionTypes.BITCOINCASH_PREPARE_SEND_TRANSACTION,
})

export const signPreparedTransaction = (rawTx) => ({
  type: ActionTypes.BITCOINCASH_SIGN_PREPARED_TRANSACTION,
  rawTx,
})

export const sendTransaction = (signedRawTx) => ({
  type: ActionTypes.BITCOINCASH_SEND_TRANSACTION,
  signedRawTx,
})

export const selectWallet = (walletAddress) => ({
  type: ActionTypes.BITCOINCASH_SELECT_WALLET,
  walletAddress,
})

export const resetSelectWallet = () => ({
  type: ActionTypes.BITCOINCASH_RESET_SELECT_WALLET,
})

export const signTransactionFailure = (error) => ({
  type: ActionTypes.BITCOINCASH_SIGN_TRANSACTION_FAILURE,
  error,
})

export const signTransactionSuccess = (signedRawTx) => ({
  type: ActionTypes.BITCOINCASH_SIGN_TRANSACTION_SUCCESS,
  signedRawTx,
})

export const sendTransactionFailure = (error) => ({
  type: ActionTypes.BITCOINCASH_SEND_TRANSACTION_FAILURE,
  error,
})

export const sendTransactionSuccess = () => ({
  type: ActionTypes.BITCOINCASH_SEND_TRANSACTION_SUCCESS,
})
