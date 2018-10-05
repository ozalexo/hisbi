/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'

export const selectAccountList = createSelector(
  (state) => state.accounts,
  (accounts) => accounts.list
)

export const selectAccountSelected = createSelector(
  (state) => state.accounts,
  (accounts) => accounts.selected
)
