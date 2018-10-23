/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Stomp from './Stomp'
import Socket from './WebSocket'

export default class SubscriptionManager {
  static constructor = (blockchainList) => {
    this.subscriptions = {}
    blockchainList.forEach((blockchain) => {
      this.subscriptions[blockchain] = []
    })
  }
  subscribe = (blockchain, channel) => {
    this.subscriptions[blockchain].push(Stomp.subscribe(channel))
  }
  unsubscribe = (blockchain, channel) =>  {
    Stomp.unsubscribe(channel)
  }

}
