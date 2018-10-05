/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'

// eslint-disable-next-line import/prefer-default-export
export const generateBitcoinAddressByEthereumPrivateKey = (privateKey, networkType) => {
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
