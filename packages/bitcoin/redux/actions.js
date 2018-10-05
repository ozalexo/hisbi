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

