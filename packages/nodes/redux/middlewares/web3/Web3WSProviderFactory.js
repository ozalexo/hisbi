/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3 from 'web3'

const noneFunction = () => {}

export default (host, onconnect, onerror, onend) => {
  class Web3WebsocketProvider {
    constructor (
      host,
      onconnect = noneFunction,
      onerror = noneFunction,
      onend = noneFunction
    ) {
      this.host = host
      this.provider = new Web3.providers.WebsocketProvider(host)
      this.provider.on('connect', onconnect)
      this.provider.on('error', onerror)
      this.provider.on('end', onend)
    }

    getProvider = () => this.provider

    getHost = () => this.host

  }

  return new Web3WebsocketProvider(host, onconnect, onerror, onend)
}
