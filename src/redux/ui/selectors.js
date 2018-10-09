/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { selectBitcoinWallets } from '@chronobank/bitcoin/redux/selectors'
import { BLOCKCHAIN_BITCOIN } from '@chronobank/bitcoin/constants'
import { selectEthereumWallets } from '@chronobank/ethereum/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'

export const selectAllMainWallets = createSelector(
  [selectEthereumWallets, selectBitcoinWallets],
  (ethereumWallets, bitcoinWallets) => ({
    [BLOCKCHAIN_ETHEREUM]: Object.keys(ethereumWallets)
      .filter((walletAddress) => !ethereumWallets[walletAddress].derivedPath) // we need only main wallets
      .map((walletAddress) => bitcoinWallets[walletAddress]),
    [BLOCKCHAIN_BITCOIN]: Object.keys(bitcoinWallets)
      .filter((walletAddress) => !bitcoinWallets[walletAddress].derivedPath) // we need only main wallets
      .map((walletAddress) => bitcoinWallets[walletAddress]),
  })

)

export const selectAccountSelected = createSelector(
  (state) => state.accounts,
  (accounts) => accounts.selected
)
