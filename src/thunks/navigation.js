/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  goBack,
  push
} from 'connected-react-router'

export const navigateBack = () => (dispatch) => {
  dispatch(goBack())
}

export const navigateToWallets = () => (dispatch) =>
  dispatch(push('/wallets'))

export const navigateTo2Fa = () => (dispatch) =>
  dispatch(push('/2fa'))

export const navigateToRoot = () => (dispatch) =>
  dispatch(push('/'))

export const navigateToVoting = () => (dispatch) =>
  dispatch(push('/voting'))

export const navigateToAddWallet = () => (dispatch) =>
  dispatch(push('/add-wallet'))

export const navigateToNewPoll = () => (dispatch) =>
  dispatch(push('/new-poll'))

export const navigateToPoll = () => (dispatch) =>
  dispatch(push('/poll'))

export const navigateToCreateAccount = () => (dispatch) => {
  dispatch(push('/create-account'))
}

export const navigateToCreateHWAccount = () => (dispatch) => {
  dispatch(push('/create-hw-account'))
}

export const navigateToSelectImportMethod = () => (dispatch) => {
  dispatch(push('/import-methods'))
}

export const navigateToTrezorImportMethod = () => (dispatch) => {
  dispatch(push('/trezor-login'))
}

export const navigateToLedgerImportMethod = () => (dispatch) => {
  dispatch(push('/ledger-login'))
}

export const navigateToPluginImportMethod = () => (dispatch) => {
  dispatch(push('/plugin-login'))
}

export const navigateToMnemonicImportMethod = () => (dispatch) => {
  dispatch(push('/mnemonic-login'))
}

export const navigateToPrivateKeyImportMethod = () => (dispatch) => {
  dispatch(push('/private-key-login'))
}

export const navigateToSelectWallet = () => (dispatch) => {
  dispatch(push('/select-account'))
}

export const navigateToLoginPage = () => (dispatch) => {
  dispatch(push('/login'))
}

export const navigateToRecoverAccountPage = () => (dispatch) => {
  dispatch(push('/recover-account'))
}

export const navigateToWalletUploadMethod = () => (dispatch) => {
  dispatch(push('/upload-wallet'))
}
