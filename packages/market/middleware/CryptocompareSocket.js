/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

/*
 * INFO: WebSocket API https://www.cryptocompare.com/api/#-api-web-socket-
 * INFO: socket.io-client based on Emitter NPM package
 * Emitter API https://github.com/component/emitter
 */

import io from 'socket.io-client'
import { URL } from './constants'
import { prepareSubscriptions, extractMessage } from './utils'

class CryptocompareSocket {
  constructor () {
    this.socket = null
    this.manager = null
    this.subscriptions = []
    this.actions = {}
  }

  subscribe () {
    this.subscriptions = prepareSubscriptions()

    return new Promise((resolve, reject) => {
      try {
        this.socket.emit('SubAdd', { subs: this.subscriptions })
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  setEventHandler (event, eventHandler) {
    return new Promise((resolve, reject) => {
      try {
        this.socket.on([event], (data) => {
          const extractedData = extractMessage(data)
          eventHandler(extractedData)
        })
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  unsetEventHandler (event, eventHandler) {
    return new Promise((resolve, reject) => {
      try {
        this.socket.off([event], eventHandler)
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  unsubscribe () {
    return new Promise((resolve, reject) => {
      try {
        this.socket.emit('SubRemove', { subs: this.subscriptions })
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.socket = io(URL)
      this.socket.on('connect', () => {
        return resolve()
      })
      this.socket.on('disconnect', () => {
        return reject()
      })
      this.socket.connect()
    })
  }

  disconnect () {
    return new Promise((resolve, reject) => {
      try {
        this.socket.close()
        this.socket = null
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }
}

export default new CryptocompareSocket()
