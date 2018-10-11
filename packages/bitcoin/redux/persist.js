/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist'
import { DUCK_BITCOIN } from './constants'

const keepOnlyDerivedWallets = createTransform(

  // transform state on its way to being serialized and persisted.
  (inboundState/*, key*/) => {
    // console.log('inboundState before', inboundState)
    // Object.keys(inboundState)
    //   .forEach((accountAddress) => {
    //     Object.keys(inboundState[accountAddress])
    //       .forEach((walletAddress) => {
    //         if (!inboundState[accountAddress][walletAddress].hasOwnProperty('derivedPath')) {
    //           delete inboundState[accountAddress][walletAddress]
    //         }
    //       })
    //     if (Object.keys(inboundState[accountAddress]).length === 0) {
    //       delete inboundState[accountAddress]
    //     }
    //   })
    // console.log('inboundState after', inboundState)
    return inboundState
  },

  // transform state being rehydrated
  (outboundState/*, key*/) => {
    console.log('outboundState before', outboundState)
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
    console.log('outboundState after', outboundState)
    return outboundState
  },

  // define which reducers this transform gets called for.
  {
    whitelist: ['wallets'],
  }
)

const BITCOIN_PERSIST_CONFIG = {
  key: DUCK_BITCOIN,
  version: '1.0',
  storage: storage,
  whitelist: ['wallets'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
  transforms: [keepOnlyDerivedWallets],
}

export default BITCOIN_PERSIST_CONFIG
