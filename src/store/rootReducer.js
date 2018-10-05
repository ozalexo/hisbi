/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { DUCK_ACCOUNTS } from '@chronobank/auth/redux/accounts/constants'
import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import { DUCK_BITCOIN_CASH } from '@chronobank/bitcoincash/redux/constants'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { DUCK_LITECOIN } from '@chronobank/litecoin/redux/constants'
import { DUCK_NEM } from '@chronobank/nem/redux/constants'
import { DUCK_NODES } from '@chronobank/nodes/redux/nodes/constants'
import { DUCK_SESSION } from '@chronobank/auth/redux/session/constants'
import { DUCK_WAVES } from '@chronobank/waves/redux/constants'
import accounts from '@chronobank/auth/redux/accounts/reducer'
import bitcoin from '@chronobank/bitcoin/redux/reducers'
import bitcoincash from '@chronobank/bitcoincash/redux/reducers'
import ethereum from '@chronobank/ethereum/redux/reducers'
import litecoin from '@chronobank/litecoin/redux/reducers'
import nem from '@chronobank/nem/redux/reducers'
import nodes from '@chronobank/nodes/redux/nodes/reducer'
import session from '@chronobank/auth/redux/session/reducer'
import waves from '@chronobank/waves/redux/reducers'

export const accountsPersistConfig = {
  key: 'accounts',
  storage: storage,
  whitelist: ['selected', 'list'],
  // blacklist: ['decryptedWallet'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
}

export const bitcoinPersistConfig = {
  key: [DUCK_BITCOIN],
  storage: storage,
  whitelist: ['wallets'],
  // blacklist: ['decryptedWallet'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
}

export default combineReducers({
  // Blockchains
  [DUCK_BITCOIN_CASH]: bitcoincash,
  [DUCK_BITCOIN]: bitcoin,
  [DUCK_ETHEREUM]: ethereum,
  [DUCK_LITECOIN]: litecoin,
  [DUCK_NEM]: nem,
  [DUCK_WAVES]: waves,
  // App's ducks
  [DUCK_ACCOUNTS]: persistReducer(accountsPersistConfig, accounts),
  [DUCK_NODES]: nodes,
  [DUCK_SESSION]: session,
})
