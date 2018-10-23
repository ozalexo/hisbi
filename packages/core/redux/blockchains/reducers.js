/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const blockchainAdd = (state, payload) => ({
  ...state,
  availableBlockchains: [
    ...state.availableBlockchains,
    payload.blockchain,
  ],
})

const blockchainRemove = (state, payload) => ({
  ...state,
  availableBlockchains: state.availableBlockchains
    .filter((blockchain) => blockchain !== payload.blockchain),
})

const blockchainEnable = (state, payload) => ({
  ...state,
  enabledBlockchains: [
    ...state.enabledBlockchains,
    payload.blockchain,
  ],
})

const blockchainDisable = (state, payload) => ({
  ...state,
  enabledBlockchains: state.enabledBlockchains
    .filter((blockchain) => blockchain !== payload.blockchain),
})

const mutations = {
  [ActionTypes.CORE_BLOCKCHAIN_ADD]: blockchainAdd,
  [ActionTypes.CORE_BLOCKCHAIN_DISABLE]: blockchainDisable,
  [ActionTypes.CORE_BLOCKCHAIN_ENABLE]: blockchainEnable,
  [ActionTypes.CORE_BLOCKCHAIN_REMOVE]: blockchainRemove,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
