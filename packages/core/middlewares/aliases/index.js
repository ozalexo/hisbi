/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import getAliases from './aliasmaps'
import { selectSessionType } from '@chronobank/auth/redux/session/selectors'

export default (store) => (next) => (action) => {
  const currentAuthType = selectSessionType(store.getState())
  const alias = getAliases(currentAuthType)[action.type]

  if (alias) {
    return next(alias(action))
  }

  return next(action)
}
