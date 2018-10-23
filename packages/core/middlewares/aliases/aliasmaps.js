/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as MemoryBitcoinThunks from '@chronobank/bitcoin/api/Memory/thunks'
import * as LedgerBitcoinThunks from '@chronobank/bitcoin/api/Ledger/thunks'
import * as TrezorBitcoinThunks from '@chronobank/bitcoin/api/Trezor/thunks'

import * as MemoryEthereumThunks from '@chronobank/ethereum/api/Memory/thunks'
import * as LedgerEthereumThunks from '@chronobank/ethereum/api/Ledger/thunks'
import * as TrezorEthereumThunks from '@chronobank/ethereum/api/Trezor/thunks'

const MemoryActionsAliases = {
  'BITCOIN_GET_ADDRESS': MemoryBitcoinThunks.getAddress(),
  'BITCOIN_SIGN_TRANSACTION': MemoryBitcoinThunks.signTransaction(),
  'ETHEREUM_GET_ADDRESS': MemoryEthereumThunks.getAddress(),
  'ETHEREUM_SIGN_TRANSACTION': MemoryEthereumThunks.signTransaction(),
}

const LedgerActionsAliases = {
  'BITCOIN_GET_ADDRESS': LedgerBitcoinThunks.getAddress(),
  'BITCOIN_SIGN_TRANSACTION': LedgerBitcoinThunks.signTransaction(),
  'ETHEREUM_GET_ADDRESS': LedgerEthereumThunks.getAddress(),
  'ETHEREUM_SIGN_TRANSACTION': LedgerEthereumThunks.signTransaction(),
}

const TrezorActionsAliases = {
  'BITCOIN_GET_ADDRESS': TrezorBitcoinThunks.getAddress(),
  'BITCOIN_SIGN_TRANSACTION': TrezorBitcoinThunks.signTransaction(),
  'ETHEREUM_GET_ADDRESS': TrezorEthereumThunks.getAddress(),
  'ETHEREUM_SIGN_TRANSACTION': TrezorEthereumThunks.signTransaction(),
}

const getAliases = (type) => {
  switch (type) {
  case 'Memory':
    return MemoryActionsAliases
  case 'Ledger':
    return LedgerActionsAliases
  case 'Trezor':
    return TrezorActionsAliases
  }
}

export default getAliases
