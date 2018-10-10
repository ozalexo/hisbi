/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'
import TransportU2F from '@ledgerhq/hw-transport-u2f'
import AppBTC from '@ledgerhq/hw-app-btc'

export const getAddress = async (path) => {
  const transport = await TransportU2F.create()
  const app = new AppBTC(transport)
  const result = await app.getWalletPublicKey(path)

  return result.bitcoinAddress
}

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

export const signTransaction = async (unsignedRawTransaction, path, network) => {
  // tx object
  const txb = new bitcoin.TransactionBuilder.fromTransaction(
    bitcoin.Transaction.fromHex(unsignedRawTransaction),
    network
  )

  const inputs = []

  await txb.buildIncomplete().ins.forEach(async (input) => {
    const txHash = Buffer.from(input.hash)
      .reverse()
      .toString('hex')
    const { data } = await API.get(`rawTx/${txHash}`)
    inputs.push([await splitTransaction(data.unsignedRawTransaction), input.index])
  })

  const bufferedInput = await splitTransaction(unsignedRawTransaction)
  const outputScript = await serializeTransactionOutputs(bufferedInput)
  const outputScriptHex = await outputScript.toString('hex')
  const result = await createPaymentTransactionNew(inputs, [path], path, outputScriptHex)

  return result
}
