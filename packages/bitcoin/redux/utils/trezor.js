/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'
import TrezorConnect from 'trezor-connect'

// TODO: [AO] xpub does not required. Awaiting fix from Micke.
export const getAddress = async (path, network) => {
  return  bitcoin.HDNode
    .fromBase58(this.xpub, network)
    .derivePath(path)
    .getAddress()
}

export const signTransaction = async (unsignedTxHex, path, network) => {
  // tx object
  const txb = new bitcoin.TransactionBuilder
    .fromTransaction(bitcoin.Transaction.fromHex(unsignedTxHex), network)
  const localAddress = getAddress(path, network)

  // TODO:[AO] need to check, that localAddresses may be null or undefined
  if (!localAddress) {
    return
  }

  const address_n = path.split('/').map((entry) =>
    entry[entry.length - 1] === "'"
      ? parseInt(entry.substring(0, entry.length - 1)) | 0x80000000
      : parseInt(entry)
  )
  const inputs = []

  txb.buildIncomplete().ins.forEach((input) => {
    inputs.push({
      address_n: address_n,
      prev_index: input.index,
      prev_hash: Buffer.from(input.hash)
        .reverse()
        .toString('hex'),
    })
  })

  const outputs = []

  txb.buildIncomplete().outs.forEach((out) => {
    const address = bitcoin.address
      .fromOutputScript(out.script, network)
    let output = {
      address: address,
      amount: out.value.toString(),
      script_type: 'PAYTOADDRESS',
    }
    if (address === localAddress) {
      output = { ...output, address_n: address_n }
      delete output['address']
    }
    outputs.push(output)
  })

  const result = await TrezorConnect.signTransaction({
    inputs: inputs,
    outputs: outputs,
    coin: 'Testnet', // TODO: Need to do mainnet support?
  })

  return result

}
