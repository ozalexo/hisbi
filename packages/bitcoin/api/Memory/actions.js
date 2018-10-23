/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const getAddress = () => ({
  type: ActionTypes.BITCOIN_GET_ADDRESS,
})

export const getAddressSucces = (address) => ({
  type: ActionTypes.BITCOIN_GET_ADDRESS_SUCCESS,
  address,
})

export const getAddressFailure = (error) => ({
  type: ActionTypes.BITCOIN_GET_ADDRESS_FAILURE,
  error,
})

export const signTransaction = () => ({
  type: ActionTypes.BITCOIN_SIGN_TRANSACTION,
})

export const signTransactionSuccess = (rawSignedTx) => ({
  type: ActionTypes.BITCOIN_SIGN_TRANSACTION_SUCCESS,
  rawSignedTx,
})

export const signTransactionFailure = (error) => ({
  type: ActionTypes.BITCOIN_SIGN_TRANSACTION_FAILURE,
  error,
})
