/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { selectCurrentAccount } from '@chronobank/auth/redux/accounts/selectors'
import { selectBlockchainNetworkId } from '@chronobank/nodes/redux/nodes/selectors'
import { selectSessionType } from '@chronobank/auth/redux/session/selectors'
import { BLOCKCHAIN_BITCOINCASH } from '../constants'
import { selectCurrentDerivedPath} from './selectors'
import * as BitcoinCashActions from './actions'
import * as Utils from './utils'

// eslint-disable-next-line import/prefer-default-export
export const createBitcoinCashWallet = ({ isMain = false, privateKey }) => (dispatch, getState) => {
  const state = getState()
  const loginType = selectSessionType(state)
  const derivedPath = selectCurrentDerivedPath(state)
  const networkType = selectBlockchainNetworkId(BLOCKCHAIN_BITCOINCASH)(state)
  const ethereumAddress = selectCurrentAccount(state)

  try {
    const address = Utils.getAddress(loginType, privateKey, derivedPath, networkType)
    const wallet = {
      address,
      type: loginType,
      isMain,
    }
    dispatch(BitcoinCashActions.createWalletByPrivateKey(
      wallet,
      ethereumAddress,
    ))
    return address
  } catch (error) {
    throw new Error(error)
  }
}
