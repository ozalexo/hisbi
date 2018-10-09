/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { selectBitcoinPendingTransactions } from '@chronobank/bitcoin/redux/selectors'
import { selectEthereumPendingTransactions } from '@chronobank/ethereum/redux/selectors'

// eslint-disable-next-line import/prefer-default-export
export const selectAllWalletsPendingTransactionsLength = createSelector(
  [selectBitcoinPendingTransactions, selectEthereumPendingTransactions],
  (bitcoinPendingTransactions, ethereumPendingTransactions) => {
    return [
      ...bitcoinPendingTransactions,
      ...ethereumPendingTransactions,
    ].length
  }
)
