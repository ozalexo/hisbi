/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { selectCurrentNetworkType } from '@chronobank/nodes/redux/nodes/selectors'
import { selectCurrentAccount } from '@chronobank/auth/redux/accounts/selectors'

import { DUCK_BITCOINCASH } from './constants'

export const selectDuckBitcoinCash = (state) =>
  state[DUCK_BITCOINCASH]

export const selectCurrentDerivedPath = createSelector(
  [selectCurrentNetworkType, selectDuckBitcoinCash],
  (networkType, duckBitcoinCash) => {
    return duckBitcoinCash.derivedPath[networkType]
  }
)

export const selectBitcoinWallets = createSelector(
  [selectDuckBitcoinCash],
  (duckBitcoinCash) => {
    return duckBitcoinCash.wallets
  }
)

export const selectPreparedUnsignedTransaction = createSelector(
  selectDuckBitcoinCash,
  (bitcoin) =>
    bitcoin.prepareSendTransaction && bitcoin.prepareSendTransaction.rawTx
)

export const selectBitcoinPendingTransactions = createSelector(
  [selectBitcoinWallets, selectCurrentAccount],
  (wallets, selectedAccount) => {
    return Object.values(wallets[selectedAccount])
      .flatMap((wallet) => Object.values(wallet.transactions.pending))
  }
)

export const selectBitcoinTransactions = createSelector(
  [selectBitcoinWallets],
  (wallets, selectedAccount) => {
    return Object.values(wallets[selectedAccount])
      .flatMap((wallet) => Object.values(wallet.transactions.list))
  }
)

export const selectSignedTransaction = createSelector(
  selectDuckBitcoinCash,
  (bitcoin) =>
    bitcoin.prepareSendTransaction && bitcoin.prepareSendTransaction.signedRawTx
)
