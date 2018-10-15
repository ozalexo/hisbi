/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// INFO: trezor-connect API https://github.com/trezor/connect/blob/develop/docs/methods.md

import * as TrezorActions from './actions'
import TrezorManager from './TrezorManager'
import * as ActionTypes from './constants'

const createTrezorMiddleware = () => {

  const initTrezorManager = (dispatch) => {
    try {
      TrezorManager.init(dispatch)
      dispatch(TrezorActions.initTrezorManagerSuccess())
    } catch (error) {
      dispatch(TrezorActions.initTrezorManagerFailure(error))
    }
  }

  const getPublicKey = async (dispatch, payload) => {
    return TrezorManager.getPublicKey(payload.params)
      .then((result) => {
        return dispatch(TrezorActions.getPublicKeySuccess(result))
      })
      .catch((error) => {
        return dispatch(TrezorActions.getPublicKeyFailure(error))
      })
  }

  const getAddress = async (dispatch, payload) => {
    return TrezorManager.getAddress(payload.params)
      .then((address) => {
        return dispatch(TrezorActions.getAddressSuccess(address))
      })
      .catch((error) => {
        return dispatch(TrezorActions.getAddressFailure(error))
      })
  }

  const ethereumGetAddress = async (dispatch, payload) => {
    return TrezorManager.ethereumGetAddress(payload.params)
      .then((payload) => {
        return dispatch(TrezorActions.ethereumGetAddressSuccess(payload))
      })
      .catch((error) => {
        return dispatch(TrezorActions.ethereumGetAddressFailure(error))
      })
  }

  const mutations = {
    [ActionTypes.TREZOR_INIT]: initTrezorManager,
    [ActionTypes.TREZOR_GET_ADDRESS]: getAddress,
    [ActionTypes.TREZOR_GET_PUBLIC_KEY]: getPublicKey,
    [ActionTypes.TREZOR_ETHEREUM_GET_ADDRESS]: ethereumGetAddress,
  }

  return (store) => (next) => (action) => {
    const { type, ...payload } = action
    if (type in mutations) {
      return mutations[type](store.dispatch, payload)
    }
    return next(action)
  }

}

export default createTrezorMiddleware
