/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as SidesActions from './actions'

export const sidesOpen = (props) => (dispatch) =>
  dispatch(SidesActions.sidesOpen(props))

export const sidesClose = (key) => (dispatch) =>
  dispatch(SidesActions.sidesClose(key))

export const sidesClear = () => (dispatch) =>
  dispatch(SidesActions.sidesClear())

export const sidesCloseAll = () => (dispatch) =>
  dispatch(SidesActions.sidesCloseAll())

export const toggleSidePanel = (panelKey, isOpened) => (dispatch) =>
  dispatch(SidesActions.sidesToggle(panelKey, isOpened))

export const toggleMainMenu = (mainMenuIsOpen) => (dispatch) =>
  dispatch(SidesActions.sidesToggleMainMenu(mainMenuIsOpen))
