/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { selectBlockchainNetworkId } from '@chronobank/nodes/redux/nodes/selectors'
import { selectSessionType } from '@chronobank/auth/redux/session/selectors'
import { selectCurrentDerivedPath } from '../../redux/selectors'
import MemorySigner from '../MemorySigner'
import LedgerSigner from '../LedgerSigner'
import TrezorSigner from '../TrezorSigner'
import { BLOCKCHAIN_BITCOIN } from '../../constants'

// eslint-disable-next-line import/prefer-default-export
export const getBitcoinSigner = (privateKey = null) => createSelector(
  (state) => state,
  (state) => {
    const walletType = selectSessionType(state)
    const networkType = selectBlockchainNetworkId(BLOCKCHAIN_BITCOIN)(state)
    switch (walletType) {
    case 'Ledger': {
      const path = selectCurrentDerivedPath()
      if (!path) {
        return null
      }
      return new LedgerSigner({ path })
    }
    case 'Trezor': {
      const path = selectCurrentDerivedPath()
      if (!path || !networkType) {
        return null
      }
      return new TrezorSigner({ path, networkType })
    }
    default: {
      if (!privateKey) {
        return null
      }
      return new MemorySigner({ privateKey, networkType })
    }
    }
  }
)
