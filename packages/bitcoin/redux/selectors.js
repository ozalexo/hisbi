/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { selectCurrentNetworkType } from '@chronobank/nodes/redux/nodes/selectors'
import { selectAccountSelected } from '@chronobank/auth/redux/accounts/selectors'

import { DUCK_BITCOIN } from './constants'

export const selectDuckBitcoin = (state) =>
  state[DUCK_BITCOIN]

export const selectCurrentDerivedPath = createSelector(
  [selectCurrentNetworkType, selectDuckBitcoin],
  (networkType, duckBitcoin) => {
    return duckBitcoin.derivedPath[networkType]
  }
)

export const selectBitcoinWallets = createSelector(
  [selectDuckBitcoin],
  (duckBitcoin) => {
    return duckBitcoin.wallets
  }
)

export const selectPreparedUnsignedTransaction = createSelector(
  selectDuckBitcoin,
  (bitcoin) =>
    bitcoin.prepareSendTransaction && bitcoin.prepareSendTransaction.rawTx
)

export const selectBitcoinPendingTransactions = createSelector(
  [selectBitcoinWallets, selectAccountSelected],
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
  selectDuckBitcoin,
  (bitcoin) =>
    bitcoin.prepareSendTransaction && bitcoin.prepareSendTransaction.signedRawTx
)
