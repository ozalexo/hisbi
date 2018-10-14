/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'
import TransportU2F from '@ledgerhq/hw-transport-u2f'
import AppBTC from '@ledgerhq/hw-app-btc'
import AbstractBitcoinSigner from './AbstractBitcoinSigner'
import axios from 'axios'

const BASE_URL = 'https://test-insight.bitpay.com/api/'

const API = axios.create({
  baseURL: BASE_URL,
})

const serializeTransactionOutputs = async (...args) => {
  const transport = await TransportU2F.create()
  const app = new AppBTC(transport)

  return app.serializeTransactionOutputs(...args)
}

const splitTransaction = async (...args) => {
  const transport = await TransportU2F.create()
  const app = new AppBTC(transport)

  return app.splitTransaction(...args)
}

const createPaymentTransactionNew = async (...args) => {
  const transport = await TransportU2F.create()
  transport.setDebugMode(true)
  const app = new AppBTC(transport)

  return app.createPaymentTransactionNew(...args)
}

export default class LedgerSigner extends AbstractBitcoinSigner {

  constructor ({ path }) {
    super({ path })
  }

  // this method is a part of base interface
  async getAddress () {
    const transport = await TransportU2F.create()
    const app = new AppBTC(transport)
    const result = await app.getWalletPublicKey(this.path)

    return result.bitcoinAddress
  }

  async signTransaction (rawTx) {
    // tx object
    const txb = new bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(rawTx), this.network)

    const inputs = []

    await txb.buildIncomplete().ins.forEach(async (input) => {
      const txHex = Buffer.from(input.hash)
        .reverse()
        .toString('hex')
      const { data } = await API.get(`rawtx/${txHex}`)
      inputs.push([await this.splitTransaction(data.rawtx), input.index])
    })

    const bufferedInput = await splitTransaction(rawTx)
    const outputScript = await serializeTransactionOutputs(bufferedInput)
    const outputScriptHex = await outputScript.toString('hex')
    const result = await createPaymentTransactionNew(inputs, [this.path], this.path, outputScriptHex)

    return result
  }

}
