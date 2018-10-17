/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as MiddlewareActions from './actions'
import { selectWeb3ListenerReconnectingStatus } from '../../nodes/selectors'

export const middlewareConnect = () => (dispatch) =>
  dispatch(MiddlewareActions.middlewareConnect())

export const middlewareDisconnect = () => (dispatch) =>
  dispatch(MiddlewareActions.middlewareDisconnect())

export const middlewareSubscribe = (channel, onMessageThunk) => (dispatch) =>
  dispatch(MiddlewareActions.middlewareSubscribe(channel, onMessageThunk))

export const middlewareUnsubscribe = (channel) => (dispatch) =>
  dispatch(MiddlewareActions.middlewareUnsubscribe(channel))

export const middlewareReconnect = (id, isConnecting) => (dispatch, getState) => {
  const state = getState()
  const isConnectingState = selectWeb3ListenerReconnectingStatus(state)
  console.log('Call middlewareReconnect thunk from %s. isConnecting = %s', id, isConnectingState)
  if (!isConnectingState) {
    console.log('middlewareReconnect 2')
    dispatch(MiddlewareActions.middlewareReconnect(isConnecting))
  } else {
    console.log('Already connecting: Call middlewareReconnect thunk from %s', id)
  }
}
