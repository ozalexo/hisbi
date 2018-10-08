/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const connect = (state, payload) => ({})
const disconnect = (state, payload) => ({})
const reconnect = (state, payload) => ({})
const subscribe = (state, payload) => ({})
const unsubscribe = (state, payload) => ({})
const unsubscribeBlockchain = (state, payload) => ({})


const mutations = {
  [ActionTypes.RABBITMQ_CONNECT]: connect,
  [ActionTypes.RABBITMQ_DISCONNECT]: disconnect,
  [ActionTypes.RABBITMQ_RECONNECT]: reconnect,
  [ActionTypes.RABBITMQ_SUBSCRIBE]: subscribe,
  [ActionTypes.RABBITMQ_UNSUBSCRIBE]: unsubscribe,
  [ActionTypes.RABBITMQ_UNSUBSCRIBE_BLOCKCHAIN]: unsubscribeBlockchain,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
