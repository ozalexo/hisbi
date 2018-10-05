/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const uaserAuthProcessing = () => ({
  type: ActionTypes.USER_AUTH_PROCESSING,
})

export const userLogin = (password) => ({
  type: ActionTypes.USER_LOGIN,
  password,
})

export const userLoginFailure = (error) => ({
  type: ActionTypes.USER_LOGIN_FAILURE,
  error,
})

export const userLoginSuccess = () => ({
  type: ActionTypes.USER_LOGIN_SUCCESS,
})

export const userLogout = () => ({
  type: ActionTypes.USER_LOGOUT,
})

export const userLogoutFailure = (error) => ({
  type: ActionTypes.USER_LOGOUT_FAILURE,
  error,
})

export const userLogoutSuccess = () => ({
  type: ActionTypes.USER_LOGOUT_SUCCESS,
})
