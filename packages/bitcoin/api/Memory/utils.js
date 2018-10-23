/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'

const getKeyPair = (privateKey, networkType) => {
  return new bitcoin.ECPair.fromPrivateKey(
    Buffer.from(privateKey, 'hex'),
    { network: networkType }
  )
}

export const getAddress = (privateKey, networkType) => {
  const network = bitcoin.networks[networkType]
  const keyPair = getKeyPair(privateKey, networkType)
  const res = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network,
  })
  return res.address
}

export const signTransaction = (rawUnsignedTx, privateKey, networkType) => {
  const txb = new bitcoin.TransactionBuilder
    .fromTransaction(bitcoin.Transaction.fromHex(rawUnsignedTx), networkType)
  const keyPair = getKeyPair(privateKey, networkType)

  // eslint-disable-next-line no-underscore-dangle
  for (let i = 0; i < txb.__inputs.length; i++) {
    txb.sign(i, keyPair)
  }

  return txb.build().toHex()
}
