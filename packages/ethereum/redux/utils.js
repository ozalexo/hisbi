/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import hdKey from 'ethereumjs-wallet/hdkey'
import Accounts from 'web3-eth-accounts'
import bip39 from 'bip39'

// eslint-disable-next-line import/prefer-default-export
export const createWalletByMnemonic = (mnemonic, password, hdPath) => {

  const accounts = new Accounts()
  const wallets = accounts.wallet.create()
  const hdWallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))
  /* eslint-disable no-underscore-dangle */
  const hdkey = hdWallet.derivePath(hdPath)._hdkey
  const hexPrivateKey = `0x${hdkey._privateKey.toString('hex')}`
  /* eslint-enable no-underscore-dangle */
  const account = accounts.privateKeyToAccount(hexPrivateKey)
  wallets.add(account)
  const wallet = wallets[0]

  return {
    encrypted: wallet.encrypt(password),
    address: wallet.address.toLowerCase(),
    hdPath: hdPath,
    type: 'InMemory',
  }
}

export const getEthereumPrivateKeyByPassword = (encryptedWallet, password) => {
  const accounts = new Accounts()
  const wallets = accounts.wallet.decrypt([encryptedWallet], password)
  const privateKey = wallets[0].privateKey

  return privateKey
}
