/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const AppendTokenToList = (token) => ({
  type: ActionTypes.ETHEREUM_TOKENS_APPEND_LIST,
  token,
})

export const createWalletByMnemonic = () => ({
  type: ActionTypes.ETHEREUM_WALLET_CREATE,
})

export const createWalletByMnemonicSuccess = (wallet) => ({
  type: ActionTypes.ETHEREUM_WALLET_CREATE_SUCCESS,
  wallet,
})

export const createWalletByMnemonicFailure = (error) => ({
  type: ActionTypes.ETHEREUM_WALLET_CREATE_FAILURE,
  error,
})

export const getEthereumPrivateKeySuccess = () => ({
  type: ActionTypes.ETHEREUM_DECRYPT_WALLET_GET_PK_SUCCESS,
})

export const getEthereumPrivateKeyFailure = (error) => ({
  type: ActionTypes.ETHEREUM_DECRYPT_WALLET_GET_PK_FAILURE,
  error,
})
