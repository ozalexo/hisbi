/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

export default class AbstractBitcoinSigner {
  constructor ({path, networkType}) {
    if (this.getAddress === AbstractBitcoinSigner.prototype.getAddress) {
      // Error: Child has not implemented this abstract method.
      throw new TypeError('Please implement abstract method getAddress.')
    }
    if (this.signTransaction === AbstractBitcoinSigner.prototype.signTransaction) {
      // Error: Child has not implemented this abstract method.
      throw new TypeError('Please implement abstract method signTransaction.')
    }
    this.path = path
    this.networkType = networkType
  }

  getAddress ()  {
    throw new TypeError('AbstractBitcoinSigner error: do not call abstract method getAddress from child')
  }

  signTransaction () {
    throw new TypeError('AbstractBitcoinSigner error: do not call abstract method signTransaction from child')
  }
}
