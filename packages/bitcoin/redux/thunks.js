/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getEthereumPrivateKeyByPassword } from '@chronobank/ethereum/redux/thunks'
import { requestBitcoinSendRawTransaction } from '@chronobank/nodes/api/bitcoinLikeAPI'
import { selectCurrentAccount } from '@chronobank/auth/redux/accounts/selectors'
import { selectBlockchainNetworkId } from '@chronobank/nodes/redux/nodes/selectors'
import { selectSessionType } from '@chronobank/auth/redux/session/selectors'
import { BLOCKCHAIN_BITCOIN } from '../constants'
import { selectPreparedUnsignedTransaction, selectSignedTransaction, selectCurrentDerivedPath} from './selectors'
import * as BitcoinActions from './actions'
import * as Utils from './utils'

// eslint-disable-next-line import/prefer-default-export
export const createBitcoinWallet = ({ isMain = false, privateKey }) => (dispatch, getState) => {
  const state = getState()
  const loginType = selectSessionType(state)
  const derivedPath = selectCurrentDerivedPath(state)
  const networkType = selectBlockchainNetworkId(BLOCKCHAIN_BITCOIN)(state)
  const ethereumAddress = selectCurrentAccount(state)

  try {
    const address = Utils.getAddress(loginType, privateKey, derivedPath, networkType)
    const wallet = {
      address,
      type: loginType,
      isMain,
    }
    dispatch(BitcoinActions.createWalletByPrivateKey(
      wallet,
      ethereumAddress,
    ))
    return address
  } catch (error) {
    throw new Error(error)
  }
}

export const cancelSendTransaction = () => (dispatch) => {
  dispatch(BitcoinActions.cancelSendTransaction())
}

export const prepareSendTransaction = () => (dispatch) => {
  dispatch(BitcoinActions.prepareSendTransaction())
  // Next steps: modification of data in store via UI
}

// Password (if required) must be requested via App's UI if required. Here password may be empty.
export const signPreparedTransaction = (password) => (dispatch, getState) => {
  const state = getState()
  const loginType = selectSessionType(state)

  let privateKey = null
  // For all non-hardware wallets we need to obtain privateKey from encrypted Ethereum wallet
  if (!['LedgerDevice', 'TrezorDevice'].includes(loginType)) {
    try {
      // We will try to encrypt Ethereum wallet even with empty password and will catch an error
      privateKey = getEthereumPrivateKeyByPassword(password)
    } catch (error) {
      return dispatch(BitcoinActions.signTransactionFailure(error))
    }
  }

  const network = selectBlockchainNetworkId(BLOCKCHAIN_BITCOIN)(state)
  const unsignedTransactionHex = selectPreparedUnsignedTransaction(state)
  const signedTransaction = Utils.signTransaction(loginType, privateKey, unsignedTransactionHex, network)

  dispatch(BitcoinActions.signPreparedTransaction(signedTransaction))
}

export const sendTransaction = () => (dispatch, getState) => {
  const state = getState()
  const signedTransaction = selectSignedTransaction(state)

  dispatch(requestBitcoinSendRawTransaction(signedTransaction))
    .then(() => {
      return dispatch(BitcoinActions.sendTransactionSuccess())
    })
    .catch((error) => {
      return dispatch(BitcoinActions.sendTransactionFailure(error))
    })
}

export const selectWallet = (address) => (dispatch) => {
  dispatch(BitcoinActions.selectWallet(address))
}

export const resetSelectWallet = () => (dispatch) => {
  dispatch(BitcoinActions.resetSelectWallet())
}
