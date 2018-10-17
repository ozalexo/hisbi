/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'

const getKeyPair = (privateKey, network) =>
  new bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network })

export const getAddress = (privateKey, network) => {
  const { publicKey: pubkey } = getKeyPair(privateKey, network)
  const res = bitcoin.payments.p2pkh({
    pubkey,
    network,
  })
  return res.address
}

export const signTransaction = (privateKey, unsignedTxHex, network) => {
  const txb = new bitcoin.TransactionBuilder
    .fromTransaction(bitcoin.Transaction.fromHex(unsignedTxHex), network)
  const keyPair = getKeyPair(privateKey, network)
  const hashType = bitcoin.Transaction.SIGHASH_ALL | bitcoin.Transaction.SIGHASH_BITCOINCASHBIP143

  /* eslint-disable no-underscore-dangle */
  for (let i = 0; i < txb.__inputs.length; i++) {
    txb.sign(i, keyPair, null, hashType, txb.__inputs[i])
  }
  /* eslint-enable no-underscore-dangle */

  return txb.build().toHex()
}
