/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import initialState from './initialState'

const modalsClear = (state) => ({
  ...state,
  stack: [],
})

const modalsClose = (state) => ({
  ...state,
  stack: state.stack.slice(0, -1),
})

const modalsOpen = (state, payload) => ({
  ...state,
  counter: state.counter + 1,
  stack: [
    ...state.stack, {
      key: state.counter,
      componentName: payload.componentName,
      props: payload.props,
    },
  ],
})

const modalsReplace = (state, payload) => ({
  ...state,
  stack: [
    ...state.stack.slice(0, -1),
    {
      key: state.counter,
      componentName: payload.componentName,
      props: payload.props,
    },
  ],
})

const mutations = {
  [ActionTypes.MODALS_CLEAR]: modalsClear,
  [ActionTypes.MODALS_CLOSE]: modalsClose,
  [ActionTypes.MODALS_OPEN]: modalsOpen,
  [ActionTypes.MODALS_REPLACE]: modalsReplace,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
