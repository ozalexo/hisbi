/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { errors } from 'web3-core-helpers'

// WS states
const CONNECTING = 0
const OPEN = 1
// const CLOSING = 2
// const CLOSED = 3

export default class Web3Provider {
  constructor (url) {
    this.connection = null
    this.url = url
    this.responseCallbacks = {}
    this.notificationCallbacks = []
    this.connectionFail = false
  }

  connect = (timeoutMs = 1500, numberOfRetries = 10) => {
    this.connection = null
    let hasReturned = false

    const promise = new Promise((resolve, reject) => {

      const rejectInternal = () => {
        if (numberOfRetries <= 0) {
          return reject(`Can't establish WS connection to ${this.url}`)
        } else {
          if (!hasReturned) {
            hasReturned = true
            // eslint-disable-next-line no-param-reassign
            --numberOfRetries
            this.connect(timeoutMs, numberOfRetries)
              .then(resolve, reject)
          }
        }
      }

      setTimeout(() => {
        if(!hasReturned) {
          rejectInternal()
        }
      }, numberOfRetries ? timeoutMs * numberOfRetries : timeoutMs)
      if (!this.connection || (this.connection.readyState !== OPEN && this.connection.readyState !== CONNECTING)) {
        if (this.connection) {
          this.connection.close()
        }
        this.connection = new WebSocket(this.url)
        this.connection.onopen = () => {
          if (hasReturned) {
            this.connection.close()
          } else {
            this.connectionFail = false
            return resolve(this)
          }
        }
        this.connection.onclose = () => {
          setTimeout(() => { rejectInternal() }, timeoutMs)
        }
        this.connection.onerror = () => {
          setTimeout(() => { rejectInternal() }, timeoutMs)
        }
        this.connection.onmessage = (event) => {
          const data = typeof event.data === 'string'
            ? event.data
            : ''

          this.parseResponse(data).forEach(this.envokeCallbacks)
        }
      } else {
        this.connectionFail = false
        return resolve(this)
      }

    })

    promise
      .then(() => {
        hasReturned = true
      })
      .catch(() => {
        hasReturned = true
      })

    return promise
  }

  envokeCallbacks = (result) => {
    let id = null
    if (Array.isArray(result)) {
      result.forEach((load) => {
        if (this.responseCallbacks[load.id]) {
          id = load.id
        } else {
          id = result.id
        }
      })
    } else {
      id = result && result.id
    }

    if (
      !id &&
      result &&
      result.method &&
      result.method.indexOf('_subscription') !== -1
    ) {
      this.notificationCallbacks.forEach((callback) => {
        if (typeof callback === 'function') {
          callback(result)
        }
      })
    } else {
      if (this.responseCallbacks[id]) {
        this.responseCallbacks[id](null, result)
        delete this.responseCallbacks[id]
      }
    }
  }

  get connected () {
    return this.connection && this.connection.readyState === OPEN
  }

  parseResponse = (data) => {
    const returnValues = []
    let lastChunk = null
    let lastChunkTimeout = null

    // DE-CHUNKER
    const dechunkedData = data
      .replace(/\}[\n\r]?\{/g, '}|--|{') // }{
      .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{') // }][{
      .replace(/\}[\n\r]?\[\{/g, '}|--|[{') // }[{
      .replace(/\}\][\n\r]?\{/g, '}]|--|{') // }]{
      .split('|--|')

    dechunkedData.forEach((data) => {
      if (lastChunk) {
        data = lastChunk + data
      }

      let result = null

      try {
        result = JSON.parse(data)
      } catch (error) {
        lastChunk = data
        lastChunkTimeout && clearTimeout(lastChunkTimeout)
        lastChunkTimeout = setTimeout(() => {
          this.timeout()
          throw errors.InvalidResponse(data)
        }, 1000 * 15)

        return
      }

      clearTimeout(lastChunkTimeout)
      lastChunk = null

      if (result) {
        returnValues.push(result)
      }
    })

    return returnValues
  }

  timeout = () => {
    for (var key in this.responseCallbacks) {
      if (this.responseCallbacks.hasOwnProperty(key)) {
        this.responseCallbacks[key](errors.InvalidConnection('on WS'))
        delete this.responseCallbacks[key]
      }
    }
  }

  addResponseCallback = (payload, callback) => {
    const id = payload.id || payload[0].id
    const method = payload.method || payload[0].method
    this.responseCallbacks[id] = callback
    this.responseCallbacks[id].method = method
  }

  keepAlive = () => {
    if (this.connectionFail) {
      return
    }
    const timer = setTimeout(() => {
      if (!this.connectionFail) {
        this.connectionFail = true
        this.connection && this.connection.onclose(new Error('KeepAlive by timeout'))
      }
    }, 5000)
    this.send({
      id: 10000,
      jsonrpc: "2.0",
      method: "net_version",
      params: [],
    }, (error/*, res*/) => {
      timer && clearTimeout(timer)
      if (!this.connectionFail) {
        if (error) {
          this.connectionFail = true
          this.connection && this.connection.onclose(new Error('KeepAlive by error'))
        }
      }
    })
  }

  send = (payload, callback) => {
    if (!this.connection) {
      callback(new Error('300: connection not open'))
      return
    }
    if (this.connection.readyState === CONNECTING) {
      setTimeout(() => {
        this.send(payload, callback)
      }, 10)
      return
    }

    if (this.connection.readyState !== OPEN) {
      if (typeof this.connection.onerror === 'function') {
        this.connection.onerror(new Error('200: connection not open'))
      } else {
        // eslint-disable-next-line no-console
        console.error('no error callback')
      }
      callback(new Error('100: connection not open'))
      return
    }

    this.connection.send(JSON.stringify(payload))
    this.addResponseCallback(payload, callback)
  }

  on = (type, callback) => {
    if (typeof callback !== 'function')
      throw new Error('The second parameter callback must be a function.')

    switch (type) {
    case 'data':
      this.notificationCallbacks.push(callback)
      break

    case 'connect':
      this.connection.onopen = callback
      break

    case 'end':
      this.connection.onclose = callback
      break

    case 'error':
      this.connection.onerror = callback
      break
    }
    return this
  }

  removeListener = (type, callback) => {
    switch (type) {
    case 'data':
      this.notificationCallbacks.forEach(function (cb, index) {
        if (cb === callback) {
          this.notificationCallbacks.splice(index, 1)
        }
      })
      break
    }
  }

  removeAllListeners = (type) => {
    switch (type) {
    case 'data':
      this.notificationCallbacks = []
      break
    case 'connect':
      if (this.connection) {
        this.connection.onopen = null
      }
      break
    case 'end':
      if (this.connection) {
        this.connection.onclose = null
      }
      break
    case 'error':
      if (this.connection) {
        this.connection.onerror = null
      }
      break
    default:
      break
    }
  }

  disconnect = () => {
    return new Promise((resolve) => {
      this.timeout()
      this.removeAllListeners('data')
      this.removeAllListeners('connect')
      this.removeAllListeners('end')
      this.removeAllListeners('error')
      this.responseCallbacks = {}
      this.notificationCallbacks = []
      if (this.connection) {
        this.connection.close()
        this.connection = null
      }
      return resolve()
    })
  }

}
