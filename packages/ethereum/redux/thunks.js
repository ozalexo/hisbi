/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// import * as Web3ListenerActions from '../middleware/actions'
import * as Web3ListenerActions from '@chronobank/nodes/redux/middlewares/web3/actions'
import * as EthereumActions from './actions'
import * as Utils from './utils'
import * as EthereumSelectors from './selectors'

// eslint-disable-next-line import/prefer-default-export
export const initWeb3Listener = () => (
  dispatch,
  // getState
) => {
  dispatch(Web3ListenerActions.initWeb3Listener())
    .then(() => {
      dispatch(Web3ListenerActions.initWeb3ListenerSuccess())
    })
    .catch((error) => {
      dispatch(Web3ListenerActions.initWeb3ListenerFailed(error))
      throw new Error(error)
    })
}

export const appendToken = (token) => (
  dispatch,
  // getState
) => {
  dispatch(EthereumActions.AppendTokenToList(token))
}

export const createWalletByMnemonic = (mnemonic, password) => (
  dispatch,
  getState,
) => {
  const state = getState()
  const derivedPath = EthereumSelectors.selectCurrentDerivedPath(state)
  try {
    dispatch(EthereumActions.createWalletByMnemonic())
    const wallet = Utils.createWalletByMnemonic(mnemonic, password, derivedPath)
    dispatch(EthereumActions.createWalletByMnemonicSuccess(wallet))
    return wallet
  } catch (error) {
    dispatch(EthereumActions.createWalletByMnemonicFailure(error))
  }
}

export const getEthereumPrivateKeyByPassword = (password) => (
  dispatch,
  getState,
) => {
  const state = getState()
  try {
    const encryptedWallet = EthereumSelectors.selectEncryptedWallet(state)
    const privatekey =  Utils.getEthereumPrivateKeyByPassword(encryptedWallet, password)
    dispatch(EthereumActions.getEthereumPrivateKeySuccess())
    return privatekey
  } catch (error) {
    dispatch(EthereumActions.getEthereumPrivateKeyFailure(error))
  }
}
