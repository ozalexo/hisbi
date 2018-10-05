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
  const selected = AccountSelectors.selectAccountSelected(state)
  if (!selected) {
    dispatch(AccountActions.selectAccount(ethereumWallet.address))
  }
  // TODO: continuing to login. Just for demo
  const privateKey = dispatch(EthereumThunks.getEthereumPrivateKeyByPassword('111'))
  console.log('Private key is', privateKey)
  const btcAddress = dispatch(BitcoinThunks.createBitcoinWallet(privateKey))
  // Wallets are created. Let's use http API to obtain some data
  const httpResponse = dispatch(requestBitcoinSubscribeWalletByAddress('Bitcoin', btcAddress))
  console.log('HTTP reponse', httpResponse)
}
