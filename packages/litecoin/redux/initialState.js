/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { COIN_TYPE_LTC_MAINNET, COIN_TYPE_LTC_TESTNET } from '../constants'

export default {
  derivedPath: {
    mainnet: `m/44'/${COIN_TYPE_LTC_MAINNET}'/0'/0/0`,
    testnet: `m/44'/${COIN_TYPE_LTC_TESTNET}'/0'/0/0`,
  },
  enabled: true,
  tokens: {},
  wallets: {},
}


