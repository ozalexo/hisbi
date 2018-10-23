/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'
import { Map, fromJS } from 'immutable'
import * as MiddlewareActions from './actions'
import * as ActionTypes from './constants'

// WS states
const CONNECTING = 0
const OPEN = 1
const CLOSING = 2
const CLOSED = 3

const BASE_URL = 'https://rabbitmq-webstomp.chronobank.io/stomp'
const USER = 'rabbitmq_user'
const PASSWORD = '38309100024'

/*

import Socket from './ws'
import Stomp from 'webstomp-client'

    const handlers = {
      onerror: (error) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ONERROR', error)
      },
      onclose: () => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ONCLOSE')
      },
      onmessage: (message) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ONMESSAGE', message)
      },
    }

    const socket = new Socket('wss://rabbitmq-webstfomp.chronobank.io/stomp/websocket', handlers)
    socket.connect()
      .then((ws) => {
        const client = Stomp.over(ws, {
          debug: false,
          heartbeat: false,
          protocols: ['v12.stomp'],
        })
        client.connect(
          'rabbitmq_user',
          '38309100024',
          (m) => { console.log('STOMP. Connected:', m) },
          (error) => { console.log('STOMP. Error:', error) },
        )
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SUCCESS CONNECT')
      })
      .catch((error) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FAILURE CONNECT', error)
      })
*/

class SubscriptionManager {
  constructor () {
    this.subscriptions = new Map()
  }

  addSubscription = (blockchain, channel, subscription) => {
    const blockchainSection = this.subscriptions.get(blockchain)
    if (blockchainSection) {
      const channelSubscription = blockchainSection.get(channel)
      if (channelSubscription) {
        blockchainSection.update({[channel]: subscription}) // overwrite with new subscription
      } else {

      }
    } else {
      const newBlockChainSection = fromJS({
        [blockchain]: {
          [channel]: subscription
        }
      })
      this.subscriptions.set(blockchain, newBlockChainSection)
    }
  }

  delSubscription = (blockchain, channel) => {
    const blockchainSection = this.subscriptions.get(blockchain)
    if (blockchainSection) {

    }
  }

  listAllSubscriptions = () => {

  }

  delSubscriptionByBlockchain = (blockchain) => {
    this.subscriptions.deleteIn(blockchain)
  }

}

class Broker {
  constructor (url, user, password) {
    this.client = null
    this.isreconnect = false
    this.password = password || PASSWORD
    this.subscriptions = []
    this.timer = null
    this.url = url || BASE_URL
    this.user = user || USER
    this.wsState = CLOSED
  }

  connect = () => {
    if (this.wsState === OPEN) {
      this.disconnect()
    }

    if (this.wsState !== CLOSED) {
      return Promise.reject('Socket is bisy. Try again later, when')
    }
  }

  disconnect = () => {
    this.setreconnect(false)
    if (this.ws !== null || this.wsState !== CLOSED) {
      if (this.wsState === WsStateConnected) {
        this.onclose()
        this.wsState = WsStateDisconnecting
        this.ws.close(1000, 'doclose')
      } else {
        Promise.resolve('WS is busy (connecting or disconnecting)')
      }
    } else {
      return Promise.resolve('WS is not connected')
    }
  }

  subscribe = () => {}

  unsubscribe = () => {}

  setreconnect (ok) {
    if (ok) {
      this.isreconnect = true;
    } else {
      this.isreconnect = false;
      if (typeof this.timer !== 'undefined' || this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

}

let ws = null // WebSocket
let client = null // Stomp client
let subscriptions = []

const subscribe = (channel, onMessageThunk, dispatch) => {
  if (!client) {
    throw new Error('Attempt to subscribe failed: ws does not connected!')
  }
  const subscription = client.subscribe(
    channel,
    (message) => {
      try {
        const data = message && message.body && JSON.parse(message.body)
        dispatch(onMessageThunk(null, data))
      } catch (error) {
        dispatch(onMessageThunk(error))
      }
    }
  )
  subscriptions[channel] = subscription
}

const unsubscribe = (channel) => {
  const subscription = subscriptions[channel]
  if (subscription) {
    delete subscriptions[channel]
    subscription.unsubscribe()
  }
}

const unsubscribeAll = () => {
  subscriptions && subscriptions.forEach((subscription) => {
    subscription.unsubscribe()
  })
  subscriptions = {}
}

const onConnectionError = (dispatch) => (error) => {
  dispatch(MiddlewareActions.middlewareConnectFailure(error))
}

const onConnectionSuccess = (dispatch) => () => {
  dispatch(MiddlewareActions.middlewareConnectSuccess())
}

const connect = (dispatch) => {
  ws = ws || new SockJS(BASE_URL)
  client = Stomp.over(ws, {
    heartbeat: false,
    debug: false,
  })
  client.connect(
    USER,
    PASSWORD,
    onConnectionSuccess(dispatch),
    onConnectionError(dispatch),
  )
  this.clients.push({ nodeName: client })
  return true
}

const disconnect = () =>
  ws.close()

const mutations = {

  [ActionTypes.RABBITMQ_CONNECT]: (store) => {
    connect(store.dispatch)
  },

  [ActionTypes.RABBITMQ_DISCONNECT]: () => {
    unsubscribeAll()
    disconnect()
  },

  [ActionTypes.RABBITMQ_SUBSCRIBE]: (store, payload) => {
    try {
      subscribe(payload.channel, payload.onMessageThunk, store.dispatch)
      return store.dispatch(MiddlewareActions.middlewareSubscribeSuccess(payload.channel))
    } catch (error) {
      return store.dispatch(MiddlewareActions.middlewareSubscribeFailure(error))
    }
  },

  [ActionTypes.RABBITMQ_UNSUBSCRIBE]: (store, payload) => {
    if (payload && payload.channel) {
      unsubscribe(payload.channel)
    } else {
      unsubscribeAll()
    }
  },

}

export default (store) => (next) => (action) => {
  const { type, ...payload } = action
  return (action.type in mutations)
    ? mutations[type](store, payload)
    : next(action)
}
