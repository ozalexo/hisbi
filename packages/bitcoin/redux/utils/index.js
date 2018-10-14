/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// TODO: need to replace wallet/login types to appropriate constants

import * as LedgerUtils from './ledger'
import * as TrezorUtils from './trezor'
import * as InMemoryUtils from './inMemory'

export const getAddress = (loginType, privateKey, path, networkType) => {
  switch(loginType) {
  case 'LedgerDevice': {
    return LedgerUtils.getAddress(path)
  }
  case 'TrezorDevice': {
    return TrezorUtils.getAddress(path, networkType)
  }
  default: {
    return InMemoryUtils.getAddress(privateKey, networkType)
  }
  }
}

export const signTransaction = (loginType, privateKey, unsignedTxHex, network) => {
  switch(loginType) {
  case 'LedgerDevice': {
    return LedgerUtils.signTransaction(unsignedTxHex, network)
  }
  case 'TrezorDevice': {
    return TrezorUtils.signTransaction(unsignedTxHex, network)
  }
  default: {
    return InMemoryUtils.signTransaction(privateKey, unsignedTxHex, network)
  }
  }
}
