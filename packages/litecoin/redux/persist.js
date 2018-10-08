/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist'
import { DUCK_LITECOIN } from './constants'

const keepOnlyDerivedWallets = createTransform(

  // transform state on its way to being serialized and persisted.
  (inboundState/*, key*/) => {
    Object.keys(inboundState)
      .forEach((accountAddress) => {
        Object.keys(inboundState[accountAddress])
          .forEach((walletAddress) => {
            if (!inboundState[accountAddress][walletAddress].hasOwnProperty('derivedPath')) {
              delete inboundState[accountAddress][walletAddress]
            }
          })
        if (Object.keys(inboundState[accountAddress]).length === 0) {
          delete inboundState[accountAddress]
        }
      })

    return inboundState
  },

  // transform state being rehydrated
  (outboundState/*, key*/) => {
    return outboundState
  },

  // define which reducers this transform gets called for.
  {
    whitelist: ['wallets'],
  }
)

const LITECOIN_PERSIST_CONFIG = {
  key: DUCK_LITECOIN,
  version: '1.0',
  storage: storage,
  whitelist: ['wallets'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
  transforms: [keepOnlyDerivedWallets],
}

export default LITECOIN_PERSIST_CONFIG
