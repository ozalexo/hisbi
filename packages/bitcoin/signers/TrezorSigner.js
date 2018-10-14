/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin from 'bitcoinjs-lib'
import TrezorConnect from 'trezor-connect'
import AbstractBitcoinSigner from './AbstractBitcoinSigner'

export default class TrezorSigner extends AbstractBitcoinSigner {

  constructor ({ path, networkType }) {
    super({
      path,
      networkType,
    })
  }

  // TODO: xpub does not required here. Need to fix it (Micke).
  getAddress () {
    return  bitcoin.HDNode
      .fromBase58(this.xpub, this.network)
      .derivePath(this.path).getAddress()
  }

  async signTransaction (rawTx) {
    // tx object
    const txb = new bitcoin.TransactionBuilder
      .fromTransaction(bitcoin.Transaction.fromHex(rawTx), this.network)
    const localAddress = this.getAddress(this.path)

    if (!localAddress) {
      return
    }

    const address_n = this.path.split('/').map((entry) =>
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
        .fromOutputScript(out.script, this.network)
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
      coin: 'Testnet', // @todo Need to do mainnet support?
    })

    return result
  }

}
