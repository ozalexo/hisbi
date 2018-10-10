/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// TODO: need to replace login types to appropriate constants

import bitcoin from 'bitcoinjs-lib'
import BitcoinMemoryDevice from '../signers/BitcoinMemoryDevice'
import BitcoinLedgerDevice from '../signers/BitcoinLedgerDevice'
import BitcoinTrezorDevice from '../signers/BitcoinTrezorDevice'

const SUPPORTED_SIGN_TYPES = [
  'LedgerDevice',
  'Mnemonic',
  'PrivateKey',
  'TrezorDevice',
  'WalletFile',
]

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

const selectSigner = (signType) => {

  const signers = {
    // Software signers
    'Mnemonic': (privateKey, network) => new BitcoinMemoryDevice({ privateKey, network }),
    'PrivateKey': (privateKey, network) => new BitcoinMemoryDevice({ privateKey, network }),
    'WalletFile': (privateKey, network) => new BitcoinMemoryDevice({ privateKey, network }),
    // Hardware signers
    'LedgerDevice': (privateKey, network) => new BitcoinLedgerDevice({ network }),
    'TrezorDevice': (privateKey, network) => new BitcoinTrezorDevice({ network }),
  }

  return (signType in SUPPORTED_SIGN_TYPES)
    ? signers[signType]
    : null
}

export const signTransaction = (loginType, privateKey, unsignedTxHex, network) => {
  const signer = selectSigner(loginType)
  return signer(privateKey, network).signTransaction(unsignedTxHex)
}
