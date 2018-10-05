/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as NodesActionTypes from './constants'

export const nodesInit = () => ({
  type: NodesActionTypes.NODES_INIT,
})

export const primaryNodeSetExternalProvider = (w3, w3provider) => ({
  type: NodesActionTypes.WEB3_LISTENER_SET_EXTERNAL_PROVIDER,
  w3,
  w3provider,
})

export const getWeb3Instance = () => ({
  type: NodesActionTypes.WEB3_LISTENER_GET_WEB3,
})

export const getWeb3Provider = () => ({
  type: NodesActionTypes.WEB3_LISTENER_GET_WEB3,
})

export const primaryNodeGetWeb3Instance = () => ({
  type: NodesActionTypes.WEB3_LISTENER_GET_WEB3,
})

export const primaryNodeConnected = (url) => ({
  type: NodesActionTypes.WEB3_LISTENER_CONNECTED,
  url,
})

export const primaryNodeSwitch = () => ({
  type: NodesActionTypes.WEB3_LISTENER_SWITCH,
})

export const primaryNodeError = (url, error) => ({
  type: NodesActionTypes.WEB3_LISTENER_ERROR,
  error,
  url,
})

export const primaryNodeDisconnected = (url, error) => ({
  type: NodesActionTypes.WEB3_LISTENER_DISCONNECTED,
  error,
  url,
})

export const primaryNodeSetSyncingStatus = (isSyncing) => ({
  type: NodesActionTypes.WEB3_LISTENER_SYNC_STATUS,
  isSyncing,
})

export const networkSwitch = (networkIndex) => ({
  type: NodesActionTypes.NODES_NETWORK_SWITCH,
  networkIndex,
})

export const networkSelect = (networkIndex) => ({
  type: NodesActionTypes.NODES_NETWORK_SELECT,
  networkIndex,
})

export const addCustomNetwork = (host, networkTitle, alias, ws) => ({
  type: NodesActionTypes.WEB3_LISTENER_ADD_CUSTOM_NODE,
  host,
  networkTitle,
  alias,
  ws,
})

export const tokenTransfer = (symbol, data) => ({
  type: NodesActionTypes.ETHEREUM_TOKEN_TRANSFER,
  symbol,
  data,
})

export const primaryNodeIncompatibleNetwork = (url) => ({
  type: NodesActionTypes.WEB3_LISTENER_INCOMPATIBLE_NETWORK,
  url,
})

export const web3Reset = () => ({
  type: NodesActionTypes.WEB3_LISTENER_RESET,
})
