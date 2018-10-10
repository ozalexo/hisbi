/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'

export const getAddress = (privateKey, networkType) => {
  const network = bitcoin.networks[networkType]
  const keyPair = new bitcoin.ECPair.fromPrivateKey(
    Buffer.from(privateKey.slice(2, 66), 'hex'),
    { network },
  )
  const res = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network,
  })
  return res.address
}

export const signTransaction = async (privateKey, unsignedTxHex, network) => {
  const txb = new bitcoin.TransactionBuilder
    .fromTransaction(bitcoin.Transaction.fromHex(unsignedTxHex), network)
  const keyPair = new bitcoin.ECPair.fromPrivateKey(
    Buffer.from(privateKey, 'hex'),
    { network }
  )

  // eslint-disable-next-line no-underscore-dangle
  for (let i = 0; i < txb.__inputs.length; i++) {
    txb.sign(i, keyPair)
  }

  return txb.build().toHex()
}
