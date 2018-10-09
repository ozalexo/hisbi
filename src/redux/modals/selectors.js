/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { DUCK_MODALS } from './constants'

export const selectDuckModals = (state) => state[DUCK_MODALS]

export const selectModalsStack = createSelector(
  selectDuckModals,
  (modals) => modals.stack
)
