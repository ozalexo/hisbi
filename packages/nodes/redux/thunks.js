/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NodesActions from './actions'
import * as NodesSelectors from './selectors'

// TODO: It must be a bit more complex. Need to connect to second available primary node in case of connection failure
export const preselectNetwork = () => (dispatch, getState) => {
  const state = getState()
  const nodes = NodesSelectors.selectNodesState(state)
  if (nodes.selected === null) {
    if (process.env['NODE_ENV'] === 'development') {
      dispatch(networkSelect(3))
    } else {
      dispatch(networkSelect(1))
    }
  }
}

export const networkSelect = (networkIndex) => (dispatch) => {
  dispatch(NodesActions.networkSelect(networkIndex))
  dispatch(NodesActions.networkSwitch(networkIndex))
}

export const nodesInit = () => (dispatch) =>
  dispatch(NodesActions.nodesInit())
