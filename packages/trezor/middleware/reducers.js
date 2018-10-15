/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

const initTrezorManager = (state) => state

const trezorConnected = (state, payload) => ({
  ...state,
  devices: {
    ...state.devices,
    [payload.payload.features.device_id]: {
      ...payload.payload,
    },
  },
})

const trezorDisconnected = (state, payload) => {
  const devices = Object.assign({}, state.devices)
  if (payload.payload.features) {
    delete devices[payload.payload.features.device_id]
  }
  return {
    ...state,
    devices,
  }
}

const getAddress =  (state) => state
const getAddressSuccess =  (state) => state
const getAddressFailure =  (state) => state

const getPublicKey =  (state) => state
const getPublicKeySuccess =  (state) => state
const getPublicKeyFailure = (state) => state

const ethereumGetAddress =  (state) => state
const ethereumGetAddressSuccess =  (state) => state
const ethereumGetAddressFailure = (state) => state

const mutations = {
  [ActionTypes.TREZOR_INIT]: initTrezorManager,
  [ActionTypes.TREZOR_CONNECTED]: trezorConnected,
  [ActionTypes.TREZOR_DISCONNECTED]: trezorDisconnected,
  [ActionTypes.TREZOR_GET_ADDRESS]: getAddress,
  [ActionTypes.TREZOR_GET_ADDRESS_SUCCESS]: getAddressSuccess,
  [ActionTypes.TREZOR_GET_ADDRESS_FAILURE]: getAddressFailure,
  [ActionTypes.TREZOR_GET_PUBLIC_KEY]: getPublicKey,
  [ActionTypes.TREZOR_GET_PUBLIC_KEY_SUCCESS]: getPublicKeySuccess,
  [ActionTypes.TREZOR_GET_PUBLIC_KEY_FAILURE]: getPublicKeyFailure,
  [ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS]: ethereumGetAddress,
  [ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS_FAILURE]: ethereumGetAddressSuccess,
  [ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS_SUCCESS]: ethereumGetAddressFailure,
}

export default mutations
