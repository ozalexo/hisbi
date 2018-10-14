/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

export default class AbstractEthereumSigner {
  constructor ({path, networkType}) {
    if (this.getAddress === AbstractEthereumSigner.prototype.getAddress) {
      // Error: Child has not implemented this abstract method.
      throw new TypeError('Please implement abstract method getAddress.')
    }
    if (this.signTransaction === AbstractEthereumSigner.prototype.signTransaction) {
      // Error: Child has not implemented this abstract method.
      throw new TypeError('Please implement abstract method signTransaction.')
    }
    if (this.getPrivateKey === AbstractEthereumSigner.prototype.getPrivateKey) {
      // Error: Child has not implemented this abstract method.
      throw new TypeError('Please implement abstract method getPrivateKey.')
    }
    this.path = path
    this.networkType = networkType
  }

  getPrivateKey () {
    throw new TypeError('AbstractEthereumSigner error: do not call abstract method getPrivateKey from child')
  }
  getAddress ()  {
    throw new TypeError('AbstractEthereumSigner error: do not call abstract method getAddress from child')
  }

  signTransaction () {
    throw new TypeError('AbstractEthereumSigner error: do not call abstract method signTransaction from child')
  }
}
