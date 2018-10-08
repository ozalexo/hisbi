/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { i18nReducer } from 'react-redux-i18n'

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

import ROOT_PERSIST_CONFIG from './persist'
import BITCOIN_PERSIST_CONFIG from '@chronobank/bitcoin/redux/persist'
import BITCOIN_CASH_PERSIST_CONFIG from '@chronobank/bitcoincash/redux/persist'
import LITECOIN_PERSIST_CONFIG from '@chronobank/litecoin/redux/persist'
import ETHEREUM_PERSIST_CONFIG from '@chronobank/ethereum/redux/persist'
import NEM_PERSIST_CONFIG from '@chronobank/nem/redux/persist'
import WAVES_PERSIST_CONFIG from '@chronobank/waves/redux/persist'
import ACCOUNTS_PERSIST_CONFIG from '@chronobank/auth/redux/accounts/persist'

const createRootReducer = () => {
  const getReducers = () => combineReducers({
    // Blockchains
    [DUCK_BITCOIN_CASH]: bitcoincash,
    [DUCK_BITCOIN]: bitcoin,
    [DUCK_ETHEREUM]: ethereum,
    [DUCK_LITECOIN]: litecoin,
    [DUCK_NEM]: nem,
    [DUCK_WAVES]: waves,
    // App's ducks
    [DUCK_ACCOUNTS]: accounts,
    [DUCK_NODES]: nodes,
    [DUCK_SESSION]: session,
  })

  const getPersistReducers = () => combineReducers({
    // Blockchains
    [DUCK_BITCOIN_CASH]: persistReducer(BITCOIN_CASH_PERSIST_CONFIG, bitcoincash),
    [DUCK_BITCOIN]: persistReducer(BITCOIN_PERSIST_CONFIG, bitcoin),
    [DUCK_ETHEREUM]: persistReducer(ETHEREUM_PERSIST_CONFIG, ethereum),
    [DUCK_LITECOIN]: persistReducer(LITECOIN_PERSIST_CONFIG, litecoin),
    [DUCK_NEM]: persistReducer(NEM_PERSIST_CONFIG, nem),
    [DUCK_WAVES]: persistReducer(WAVES_PERSIST_CONFIG, waves),
    // App's ducks
    [DUCK_ACCOUNTS]: persistReducer(ACCOUNTS_PERSIST_CONFIG, accounts),
    [DUCK_NODES]: nodes,
    [DUCK_SESSION]: session,
    i18n: i18nReducer,
  })

  if (ROOT_PERSIST_CONFIG.active) {
    // wrap reducers with persist
    const rootReducer = getPersistReducers()
    return rootReducer
  } else {
    const rootReducer = getReducers()
    return rootReducer
  }

}

export default createRootReducer
