/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NotifierActions from './actions'

export const notify = (notice, isStorable = true) => (dispatch) =>
  dispatch(NotifierActions.notify(notice, isStorable))

export const closeNotifier = () => (dispatch) =>
  dispatch(NotifierActions.closeNotifier())
