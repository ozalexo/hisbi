/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// import { createSelector } from 'reselect'

import { DUCK_ETHEREUM } from './constants'

export const selectDuckEthereum = (state) =>
  state[DUCK_ETHEREUM]
