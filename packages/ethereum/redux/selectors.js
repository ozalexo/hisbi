/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { selectCurrentNetworkType } from '@chronobank/nodes/redux/nodes/selectors'
import { selectCurrentAccount } from '@chronobank/auth/redux/accounts/selectors'

import { DUCK_ETHEREUM } from './constants'

export const selectDuckEthereum = (state) =>
  state[DUCK_ETHEREUM]

export const selectCurrentDerivedPath = createSelector(
  [selectCurrentNetworkType, selectDuckEthereum],
  (networkType, duckEthereum) => {
    return duckEthereum.derivedPath[networkType]
  }
)

export const selectEthereumWallets = createSelector(
  [selectDuckEthereum],
  (duckEthereum) => {
    return duckEthereum.wallets
  }
)

export const selectEncryptedWallet = createSelector(
  [selectCurrentAccount, selectEthereumWallets],
  (accountAddress, ethereumWallets) => {
    return ethereumWallets[accountAddress] && ethereumWallets[accountAddress].encrypted
  }
)

export const selectEthereumPendingTransactions = createSelector(
  [selectEthereumWallets, selectCurrentAccount],
  (wallets, selectedAccount) => {
    return Object.values(wallets[selectedAccount])
      .flatMap((wallet) => Object.values(wallet.transactions.pending))
  }
)

export const selectEthereumTransactions = createSelector(
  [selectEthereumWallets],
  (wallets, selectedAccount) => {
    return Object.values(wallets[selectedAccount])
      .flatMap((wallet) => Object.values(wallet.transactions.list))
  }
)
