/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const addInMemoryAccount = (address, accountTitle) => ({
  type: ActionTypes.ACCOUNTS_ADD_IN_MEMORY_ACCOUNT,
  accountTitle,
  address,
})

export const selectAccount = (address) => ({
  type: ActionTypes.ACCOUNTS_SELECT_ACCOUNT,
  address,
})
