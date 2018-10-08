/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as BitcoinActions from './actions'
import { BLOCKCHAIN_BITCOIN } from '../constants'
import * as Utils from './utils'
import { selectBlockchainNetworkId } from '@chronobank/nodes/redux/nodes/selectors'
import { selectAccountSelected } from '@chronobank/auth/redux/accounts/selectors'

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
