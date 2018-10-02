/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const mutations = {
  [ActionTypes.ETHEREUM_TOKENS_APPEND_LIST]: (state, { token }) => ({
    ...state,
    tokens: {
      ...state.tokens,
      token,
    },
  }),
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
