/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist'
import { DUCK_NEM } from './constants'

const keepOnlyDerivedWallets = createTransform(

  // transform state on its way to being serialized and persisted.
  (inboundState/*, key*/) => {
    return inboundState
  },

  // transform state being rehydrated
  (outboundState/*, key*/) => {
    Object.keys(outboundState)
      .forEach((accountAddress) => {
        Object.keys(outboundState[accountAddress])
          .forEach((walletAddress) => {
            if (!outboundState[accountAddress][walletAddress].hasOwnProperty('derivedPath')) {
              delete outboundState[accountAddress][walletAddress]
            }
          })
        if (Object.keys(outboundState[accountAddress]).length === 0) {
          delete outboundState[accountAddress]
        }
      })
    return outboundState
  },

  // define which reducers this transform gets called for.
  {
    whitelist: ['wallets'],
  }
)

const NEM_PERSIST_CONFIG = {
  key: DUCK_NEM,
  version: '1.0',
  storage: storage,
  whitelist: ['wallets'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
  transforms: [keepOnlyDerivedWallets],
}

export default NEM_PERSIST_CONFIG
