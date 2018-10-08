/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  goBack,
  push,
} from 'connected-react-router'

export const navigateBack = () => (dispatch) => {
  dispatch(goBack())
}

export const navigateToRoot = () => (dispatch) =>
  dispatch(push('/'))

export const navigateToCreateAccount = () => (dispatch) => {
  dispatch(push('/login/create-account'))
}

export const navigateToCreateHWAccount = () => (dispatch) => {
  dispatch(push('/login/create-hw-account'))
}

export const navigateToSelectImportMethod = () => (dispatch) => {
  dispatch(push('/login/import-methods'))
}

export const navigateToTrezorImportMethod = () => (dispatch) => {
  dispatch(push('/login/trezor-login'))
}

export const navigateToLedgerImportMethod = () => (dispatch) => {
  dispatch(push('/login/ledger-login'))
}

export const navigateToPluginImportMethod = () => (dispatch) => {
  dispatch(push('/login/plugin-login'))
}

export const navigateToMnemonicImportMethod = () => (dispatch) => {
  dispatch(push('/login/mnemonic-login'))
}

export const navigateToPrivateKeyImportMethod = () => (dispatch) => {
  dispatch(push('/login/private-key-login'))
}

export const navigateToSelectWallet = () => (dispatch) => {
  dispatch(push('/login/select-account'))
}

export const navigateToLoginPage = () => (dispatch) => {
  dispatch(push('/login'))
}

export const navigateToRecoverAccountPage = () => (dispatch) => {
  dispatch(push('/login/recover-account'))
}

export const navigateToWalletUploadMethod = () => (dispatch) => {
  dispatch(push('/login/upload-wallet'))
}


export const navigateToWallets = () => (dispatch) =>
  dispatch(push('/wallets'))

export const navigateTo2Fa = () => (dispatch) =>
  dispatch(push('/2fa'))

export const navigateToVoting = () => (dispatch) =>
  dispatch(push('/voting'))

export const navigateToAddWallet = () => (dispatch) =>
  dispatch(push('/add-wallet'))

export const navigateToNewPoll = () => (dispatch) =>
  dispatch(push('/new-poll'))

export const navigateToPoll = () => (dispatch) =>
  dispatch(push('/poll'))
