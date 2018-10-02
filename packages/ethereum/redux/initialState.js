/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { COIN_TYPE_ETH } from '../constants'

export default {
  derivedPath: {
    mainnet: `m/44'/${COIN_TYPE_ETH}'/0'/0/0`,
    testnet: `m/44'/${COIN_TYPE_ETH}'/0'/0/0`, // For ETH path in both networks are the same
  },
  enabled: true,
  tokens: {},
  wallets: {},
}


