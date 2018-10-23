/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Actions from './actions'
import * as Utils from './utils'

class Memory {
  getAddress = (privateKey, networkType) => (dispatch/*, getState*/) => {
    dispatch(Actions.getAddress())
    try {
      const address = Utils.getAddress(privateKey, networkType)
      return dispatch(Actions.getAddressSuccess(address))
    } catch (error) {
      return dispatch(Actions.getAddressFailure(error))
    }
  }

  signTransaction = (rawUnsignedTx, privateKey, networkType) => (dispatch/*, getState*/) => {
    dispatch(Actions.signTransaction())
    try {
      const signedTransaction = Utils.signTransaction(rawUnsignedTx, privateKey, networkType)
      return dispatch(Actions.signTransactionSuccess(signedTransaction))
    } catch (error) {
      return dispatch(Actions.signTransactionFailure(error))
    }
  }
}

export default new Memory()
