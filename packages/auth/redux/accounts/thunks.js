/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as AccountActions from './actions'
import * as AccountSelectors from './selectors'
import * as EthereumThunks from '@chronobank/ethereum/redux/thunks'
import * as BitcoinThunks from '@chronobank/bitcoin/redux/thunks'
import { requestBitcoinSubscribeWalletByAddress } from '@chronobank/nodes/api/bitcoinLikeAPI'

// eslint-disable-next-line import/prefer-default-export
export const createInMemoryAccount = (accountTitle, mnemonic, password) => (
  dispatch,
  getState,
) => {
  const ethereumWallet = dispatch(EthereumThunks.createWalletByMnemonic(mnemonic, password))
  dispatch(AccountActions.addInMemoryAccount(ethereumWallet.address, 'Test account Name'))
  const state = getState()
  // Check if an account already selected and select if does not
  const selected = AccountSelectors.selectCurrentAccount(state)
  if (!selected) {
    dispatch(AccountActions.selectAccount(ethereumWallet.address))
  }
  // TODO: continuing to login. Just for demo
  const privateKey = dispatch(EthereumThunks.getEthereumPrivateKeyByPassword('111'))
  const btcAddress = dispatch(BitcoinThunks.createBitcoinWallet({ isMain: true, privateKey }))
  // Wallets are created. Let's use http API to obtain some data
  dispatch(requestBitcoinSubscribeWalletByAddress('Bitcoin', btcAddress))
    .then((data) => { console.log('HTTP response OK:', data) })
    .catch((error) => { console.log('HTTP response ERROR:', error) })
}
