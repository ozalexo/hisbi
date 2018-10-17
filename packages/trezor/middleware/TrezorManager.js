/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

/* INFO:
 * trezor-connect methods API https://github.com/trezor/connect/blob/develop/docs/methods.md
 * trezor-connect events API https://github.com/trezor/connect/blob/develop/docs/events.md
 */

import TrezorConnect, { DEVICE_EVENT, DEVICE, TRANSPORT_EVENT, UI_EVENT, UI} from 'trezor-connect'
import * as TrezorMiddlewareActions from './actions'

class TrezorManager {
  constructor () {
    this.dispatch = () => {}
    this.isInitiated = false
    this.isDeviceConnected = false
  }

  async init (dispatch) {

    if (dispatch) {
      this.dispatch = dispatch
    } else {
      throw new Error('Error: TrezorManager must be initialized with dispatch.')
    }

    try {
      await TrezorConnect.init({
        // connectSrc: 'https://localhost:21324',
        debug: false,
        popup: false,
      })
      // TrezorConnect.on(TRANSPORT_EVENT, (event) => {
      //   console.log('TRANSPORT_EVENT:', event)
      // })
      // TrezorConnect.on(UI_EVENT, (event) => {
      //   console.log('UI_EVENT:', event)
      // })
      TrezorConnect.on(DEVICE_EVENT, (event) => {
        if (event.type === DEVICE.CONNECT) {
          this.isDeviceConnected = true
          this.dispatch(TrezorMiddlewareActions.trezorConnected(event.payload))
        } else if (event.type === DEVICE.DISCONNECT) {
          this.isDeviceConnected = false
          this.dispatch(TrezorMiddlewareActions.trezorDisconnected(event.payload))
        }
      })
      this.isInitiated = true
    } catch (error) {
      throw new Error(error)
    }
  }

  // TODO: required mapping of blockchain and coin names
  // See: https://github.com/trezor/connect/blob/develop/src/data/coins.json
  /**
   * params {path: string, coin: string}
   * @returns Object
   * {
   *   success: true,
   *   payload: {
   *     path: Array<number>, // hardended path
   *     serializedPath: string, // serialized path
   *     xpub: string,        // xpub in legacy format
   *     xpubSegwit?: string, // optional for segwit accounts: xpub in segwit format
   *     chainCode: string,   // BIP32 serialization format
   *     childNum: number,    // BIP32 serialization format
   *     publicKey: string,   // BIP32 serialization format
   *     fingerprint: number, // BIP32 serialization format
   *     depth: number,       // BIP32 serialization format
   *   }
   * }
   */
  getPublicKey (params) {
    if (!this.isInitiated) {
      return Promise.reject('Error: TrezorManager not initiated.')
    }
    if (!this.isDeviceConnected) {
      return Promise.reject('Error: Trezor device is not connected.')
    }
    if (!params || !params.path) {
      return Promise.reject('Error: getPublicKey method requires "path" in "params" argument.')
    }

    return new Promise((resolve, reject) => {
      TrezorConnect.getPublicKey(params)
        .then((result) => {
          console.log(result)
          if (result.success) {
            resolve(result.payload)
          } else {
            reject(result.payload.error)
          }
        })
    })
  }

  ethereumGetAddress (params) {
    if (!this.isInitiated) {
      return Promise.reject('Error: TrezorManager not initiated.')
    }
    if (!this.isDeviceConnected) {
      return Promise.reject('Error: Trezor device is not connected.')
    }
    if (!params || !params.path) {
      return Promise.reject('Error: ethereumGetAddress method requires "path" in "params" argument.')
    }

    return new Promise((resolve, reject) => {
      TrezorConnect.ethereumGetAddress(params)
        .then((result) => {
          if (result.success) {
            resolve(result.payload)
          } else {
            reject(result.payload.error)
          }
        })
    })
  }

}

export default new TrezorManager()
