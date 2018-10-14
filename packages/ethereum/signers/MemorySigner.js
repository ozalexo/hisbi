/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'
import AbstractEthereumSigner from './AbstractEthereumSigner'

const getKeyPair = (privateKey, networkType) => {
  return new bitcoin.ECPair.fromPrivateKey(
    Buffer.from(privateKey, 'hex'),
    { network: networkType }
  )
}

export default class MemorySigner extends AbstractEthereumSigner {

  constructor ({privateKey, networkType}) {
    super({
      path: null,
      networkType,
    })
    this.privateKey = privateKey
  }

  getAddress () {
    const keyPair = this.getKeyPair()
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.networkType,
    })
    return address
  }

  signTransaction (unsignedTxHex) {
    const txb = new bitcoin.TransactionBuilder
      .fromTransaction(bitcoin.Transaction.fromHex(unsignedTxHex), this.networkType)
    const keyPair = getKeyPair(this.privateKey, this.networkType)

    // eslint-disable-next-line no-underscore-dangle
    for (let i = 0; i < txb.__inputs.length; i++) {
      txb.sign(i, keyPair)
    }

    return txb.build().toHex()
  }

}
