/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { DUCK_ACCOUNTS } from './constants'

const ACCOUNTS_PERSIST_CONFIG = {
  key: DUCK_ACCOUNTS,
  version: '1.0',
  storage: storage,
  whitelist: ['list'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
}
export default ACCOUNTS_PERSIST_CONFIG
