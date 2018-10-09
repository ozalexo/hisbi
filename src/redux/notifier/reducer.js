/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import initialState from './initialState'

const notifierMessage = (state, payload) => ({
  ...state,
  notice: payload.notice,
  list: payload.isStorable ? state.list.push(payload.notice) : state.list,
  unreadNotices: (state.unreadNotices || 0) + (payload.isStorable ? 1 : 0),
})

const notifierClose = (state) => ({
  ...state,
  notice: null,
})

const mutations = {
  [ActionTypes.NOTIFIER_MESSAGE]: notifierMessage,
  [ActionTypes.NOTIFIER_CLOSE]: notifierClose,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
