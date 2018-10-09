/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const sidesClear = (state) => ({
  ...state,
  stack: {},
})

const sidesCloseAll = (state) => {
  const newStackToClose = { ...state.stack }
  Object.keys(state.stack).forEach((key) => {
    newStackToClose[key].isOpened = false
  })

  return {
    ...state,
    stack: {
      ...newStackToClose,
    },
  }
}

const sidesClose = (state, payload) => {
  const newStack = { ...state.stack }
  delete newStack[payload.panelKey]

  return {
    ...state,
    stack: { ...newStack },
  }
}

const sidesOpen = (state, payload) => ({
  ...state,
  stack: {
    ...state.stack,
    [payload.panelKey]: {
      panelKey: payload.panelKey,
      componentName: payload.componentName,
      componentProps: payload.componentProps,
      className: payload.className,
      isOpened: payload.isOpened,
      anchor: payload.anchor,
      drawerProps: payload.drawerProps,
      preCloseAction: payload.preCloseAction,
    },
  },
})

const sidesToggleMainMenu = (state, payload) => ({
  ...state,
  mainMenuIsOpen: payload.mainMenuIsOpen,
})

const sidesToggle = (state, payload) => ({
  ...state,
  stack: {
    ...state.stack,
    [payload.panelKey]: {
      ...state.stack[payload.panelKey],
      isOpened: payload.isOpened,
    },
  },
})

const mutations = {
  [ActionTypes.SIDES_CLEAR]: sidesClear,
  [ActionTypes.SIDES_CLOSE_ALL]: sidesCloseAll,
  [ActionTypes.SIDES_CLOSE]: sidesClose,
  [ActionTypes.SIDES_OPEN]: sidesOpen,
  [ActionTypes.SIDES_TOGGLE_MAIN_MENU]: sidesToggleMainMenu,
  [ActionTypes.SIDES_TOGGLE]: sidesToggle,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
