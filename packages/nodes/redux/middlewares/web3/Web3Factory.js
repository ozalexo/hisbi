/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3 from 'web3'

export default (provider) => {
  class Web3Instance {
    constructor (provider) {
      this.web3 = new Web3(provider)
    }

    getWeb3 = () => this.web3
  }

  return new Web3Instance(provider)
}

