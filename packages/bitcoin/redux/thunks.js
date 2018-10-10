/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as BitcoinActions from './actions'
import { BLOCKCHAIN_BITCOIN } from '../constants'
import * as Utils from './utils'
import { selectBlockchainNetworkId } from '@chronobank/nodes/redux/nodes/selectors'
import { selectAccountSelected } from '@chronobank/auth/redux/accounts/selectors'
import { getEthereumPrivateKeyByPassword } from '@chronobank/ethereum/redux/thunks'
import { selectSessionType } from '@chronobank/auth/redux/session/selectors'
import { selectPreparedUnsignedTransaction, selectSignedTransaction} from './selectors'
import { requestBitcoinSendRawTransaction } from '@chronobank/nodes/api/bitcoinLikeAPI'

// eslint-disable-next-line import/prefer-default-export
export const createBitcoinWallet = (privateKey) => (dispatch, getState) => {
  const state = getState()
  const network = selectBlockchainNetworkId(BLOCKCHAIN_BITCOIN)(state)
  const ethereumAddress = selectAccountSelected(state)
  try {
    const address = Utils.generateBitcoinAddressByEthereumPrivateKey(privateKey, network)
    dispatch(BitcoinActions.createWalletByPrivateKey(
      {
        address,
        type: 'InMemory',
      },
      ethereumAddress,
    ))
    return address
  } catch (error) {
    console.log('Catch error')
    console.log(error)
  }
}

export const cancelSendTransaction = () => (dispatch) => {
  dispatch(BitcoinActions.cancelSendTransaction())
}

export const prepareSendTransaction = () => (dispatch) => {
  dispatch(BitcoinActions.prepareSendTransaction())
  // Next steps: modification of data in store via UI
}

// Password (if requred) must be requested via App's UI if required. Here password may be empty.
export const signPreparedTransaction = (password) => (dispatch, getState) => {
  const state = getState()
  const loginType = selectSessionType(state)
  if (loginType === 'MetaMask') {
    // Actually, this case must be prevented earlier in UI. SendForm must be unavailable in this case.
    return dispatch(BitcoinActions.signTransactionFailure('MetaMask not supported for this wallet'))
  }

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
