/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// INFO: WebSocket specs: https://www.w3.org/TR/websockets/#websocket

// const CONNECTING = WebSocket.CONNECTING // 0
// const OPEN = WebSocket.OPEN // 1
const CLOSING = WebSocket.CLOSING // 2
// const CLOSED = WebSocket.CLOSED // 3

const MAX_CONNECTION_ATTEMPTS = 10
const RECONNECT_INTERVAL = 1000 // 1 second

export default class Socket {
  constructor (url, { onmessage, onerror, onclose }) {
    if (!url || typeof url !== 'string') {
      throw new Error(`Incorrect url provided: ${url}`)
    }
    if (!onerror || !onmessage || !onclose) {
      throw new Error(`Incorrect handlers provided`)
    }
    this.onerror = onerror
    this.onmessage = onmessage
    this.onclose = onclose
    this.url = url
    this.socket = null
    this.maxConnectAttempts = MAX_CONNECTION_ATTEMPTS
  }

  connect = () => {
    this.disconnect()

    return new Promise((resolve, reject) => {
      if (this.maxConnectAttempts === 0) {
        this.socket = null
        this.maxConnectAttempts = MAX_CONNECTION_ATTEMPTS
        return reject()
      }

      this.maxConnectAttempts -= 1
      this.socket = new WebSocket(this.url)
      this.socket.onopen = () => {
        this.maxConnectAttempts = MAX_CONNECTION_ATTEMPTS
        this.socket.onmessage = this.onmessage
        this.socket.onerror = this.onerror
        this.socket.onclose =this. onclose
        return resolve(this.socket)
      }
      // eslint-disable-next-line no-console
      this.socket.onerror = (error) => console.log('Error during WebSocket connection to %s', this.url, error)
      this.socket.onclose = () => {
        setTimeout(() => this.connect(), RECONNECT_INTERVAL)
      }
    })
  }

  disconnect = () => {
    // If socket exists and in OPEN or CONNECTING state
    if (this.socket && this.socket.readyState < CLOSING) {
      this.socket.close()
      this.socket = null
    }
    return Promise.resolve()
  }

}
