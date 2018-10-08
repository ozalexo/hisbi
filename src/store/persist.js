/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { DUCK_ACCOUNTS } from '@chronobank/auth/redux/accounts/constants'
import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import { DUCK_BITCOIN_CASH } from '@chronobank/bitcoincash/redux/constants'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { DUCK_LITECOIN } from '@chronobank/litecoin/redux/constants'
import { DUCK_NEM } from '@chronobank/nem/redux/constants'
import { DUCK_NODES } from '@chronobank/nodes/redux/nodes/constants'
import { DUCK_SESSION } from '@chronobank/auth/redux/session/constants'
import { DUCK_WAVES } from '@chronobank/waves/redux/constants'

export const ROOT_PERSIST_CONFIG = {
  active: true,
  storeConfig: {
    key: 'root',
    version: '1.0',
    storage,
    blacklist: [
      'nodes',
      'router',
      'session',
      DUCK_ACCOUNTS,
      DUCK_BITCOIN_CASH,
      DUCK_BITCOIN,
      DUCK_ETHEREUM,
      DUCK_LITECOIN,
      DUCK_NEM,
      DUCK_NODES,
      DUCK_SESSION,
      DUCK_WAVES,
    ],
  },
}

export default ROOT_PERSIST_CONFIG
