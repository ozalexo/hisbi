/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { persistReducer } from 'redux-persist'

import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import { DUCK_BITCOINCASH } from '@chronobank/bitcoincash/redux/constants'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { DUCK_LITECOIN } from '@chronobank/litecoin/redux/constants'
import { DUCK_NEM } from '@chronobank/nem/redux/constants'
import { DUCK_WAVES } from '@chronobank/waves/redux/constants'
import bitcoin from '@chronobank/bitcoin/redux/reducers'
import bitcoincash from '@chronobank/bitcoincash/redux/reducers'
import ethereum from '@chronobank/ethereum/redux/reducers'
import litecoin from '@chronobank/litecoin/redux/reducers'
import nem from '@chronobank/nem/redux/reducers'
import waves from '@chronobank/waves/redux/reducers'

import { DUCK_ACCOUNTS } from '@chronobank/auth/redux/accounts/constants'
import { DUCK_NODES } from '@chronobank/nodes/redux/nodes/constants'
import { DUCK_SESSION } from '@chronobank/auth/redux/session/constants'
import { DUCK_TREZOR } from '@chronobank/trezor/redux/constants'
import accounts from '@chronobank/auth/redux/accounts/reducer'
import nodes from '@chronobank/nodes/redux/nodes/reducer'
import session from '@chronobank/auth/redux/session/reducer'
import trezor from '@chronobank/trezor/redux/reducers'

import BITCOIN_PERSIST_CONFIG from '@chronobank/bitcoin/redux/persist'
import BITCOINCASH_PERSIST_CONFIG from '@chronobank/bitcoincash/redux/persist'
import LITECOIN_PERSIST_CONFIG from '@chronobank/litecoin/redux/persist'
import ETHEREUM_PERSIST_CONFIG from '@chronobank/ethereum/redux/persist'
import NEM_PERSIST_CONFIG from '@chronobank/nem/redux/persist'
import WAVES_PERSIST_CONFIG from '@chronobank/waves/redux/persist'
import ACCOUNTS_PERSIST_CONFIG from '@chronobank/auth/redux/accounts/persist'

export default {
  // Blockchains' ducks
  [DUCK_BITCOINCASH]: persistReducer(BITCOINCASH_PERSIST_CONFIG, bitcoincash),
  [DUCK_BITCOIN]: persistReducer(BITCOIN_PERSIST_CONFIG, bitcoin),
  [DUCK_ETHEREUM]: persistReducer(ETHEREUM_PERSIST_CONFIG, ethereum),
  [DUCK_LITECOIN]: persistReducer(LITECOIN_PERSIST_CONFIG, litecoin),
  [DUCK_NEM]: persistReducer(NEM_PERSIST_CONFIG, nem),
  [DUCK_WAVES]: persistReducer(WAVES_PERSIST_CONFIG, waves),
  // Service's ducks
  [DUCK_ACCOUNTS]: persistReducer(ACCOUNTS_PERSIST_CONFIG, accounts),
  [DUCK_NODES]: nodes,
  [DUCK_SESSION]: session,
  [DUCK_TREZOR]: trezor,
}
