/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'

import coreReducers from '@chronobank/core/reducers'
import { DUCK_MODALS } from '../redux/modals/constants'
import modals from '../redux/modals/reducer'

export default combineReducers({
  ...coreReducers,
  [DUCK_MODALS]: modals,
  i18n: i18nReducer,
})
