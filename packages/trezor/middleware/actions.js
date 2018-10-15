/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const trezorConnected = (payload) => ({
  type: ActionTypes.TREZOR_CONNECTED,
  payload,
})

export const trezorDisconnected = (payload) => ({
  type: ActionTypes.TREZOR_DISCONNECTED,
  payload,
})

export const initTrezorManager = () => ({
  type: ActionTypes.TREZOR_INIT,
})

export const initTrezorManagerSuccess = () => ({
  type: ActionTypes.TREZOR_INIT_SUCCESS,
})

export const initTrezorManagerFailure = (error) => ({
  type: ActionTypes.TREZOR_INIT_FAILURE,
  error,
})

export const getAddress = () => ({
  type: ActionTypes.TREZOR_GET_ADDRESS,
})

export const getAddressSuccess = (error) => ({
  type: ActionTypes.TREZOR_GET_ADDRESS_SUCCESS,
  error,
})

export const getAddressFailure = () => ({
  type: ActionTypes.TREZOR_GET_ADDRESS_FAILURE,
})

export const getPublicKey = (params) => ({
  type: ActionTypes.TREZOR_GET_PUBLIC_KEY,
  params,
})

export const getPublicKeySuccess = (payload) => ({
  type: ActionTypes.TREZOR_GET_PUBLIC_KEY_SUCCESS,
  payload,
})

export const getPublicKeyFailure = (error) => ({
  type: ActionTypes.TREZOR_GET_PUBLIC_KEY_FAILURE,
  error,
})

export const ethereumGetAddress = (params) => ({
  type: ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS,
  params,
})

export const ethereumGetAddressSuccess = (payload) => ({
  type: ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS_SUCCESS,
  payload,
})

export const ethereumGetAddressFailure = (error) => ({
  type: ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS_FAILURE,
  error,
})
