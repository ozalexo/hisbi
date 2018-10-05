/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const createBitcoinWallet = (state, payload) => ({
  ...state,
  wallets: {
    ...state.wallets,
    [payload.ethereumAddress]: {
      [payload.wallet.address]: payload.wallet,
    },
  },
})

const mutations = {
  [ActionTypes.BITCOIN_WALLET_CREATE]: createBitcoinWallet,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
