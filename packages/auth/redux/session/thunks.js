/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Actions from './actions'
import * as SessionSelectors from './selectors'

export const userLogin = (password) => (dispatch, getState) => {
  const state = getState()
  const isLoggedIn = SessionSelectors(state)
  if (isLoggedIn) {
    return // Silently do nothing, user already logged in
  }

  dispatch(Actions.userAuthProcessing())

  return dispatch(Actions.userLogin(password))
    .then(() => {
      dispatch(Actions.userLoginSuccess())
    })
    .catch((error) => {
      dispatch(Actions.userLoginFailure(error))
    })
}

export const userLogout = () => (dispatch, getState) => {
  const state = getState()
  const isLoggedIn = SessionSelectors(state)
  if (!isLoggedIn) {
    return // Silently do nothing, user already logged out
  }

  dispatch(Actions.userAuthProcessing())
  dispatch(Actions.userLogout())
    .then(() => {
      dispatch(Actions.userLogoutSuccess())
    })
    .catch((error) => {
      dispatch(Actions.userLogoutFailure(error))
    })
}
