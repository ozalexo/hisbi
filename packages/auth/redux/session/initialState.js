/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

export default {
  authProcessing: false,
  isLoggedIn: false,
  error: null,
  currentAuthType: null,
  authTypes: [
    {
      type: 'MetaMask',
      enabled: true,
    },
    {
      type: 'WalletFile',
      enabled: true,
    },
    {
      type: 'TrezorDevice',
      enabled: true,
    },
    {
      type: 'LedgerDevice',
      enabled: true,
    },
    {
      type: 'Mnemonic',
      enabled: true,
    },
    {
      type: 'PrivateKey',
      enabled: true,
    },
  ],
}
