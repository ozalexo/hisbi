/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

const initialState = {
  isLoggedIn: false,
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

const mutations = {

  // [persistAccountActionTypes.PERSIST_ACCOUNT_SIGNATURES_LOADING]: (state) => ({
  //   ...state,
  //   isLoadingSignatures: true
  // }),

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
