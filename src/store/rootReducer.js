import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import nodes from '@chronobank/nodes/redux/nodes/reducer'
import accounts from '../redux/accounts/reducer'

const accountPersistConfig = {
  key: 'accounts',
  storage: storage,
  whitelist: ['selected', 'list'],
  // blacklist: ['decryptedWallet'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null
}

export default combineReducers({
  accounts: persistReducer(accountPersistConfig, accounts),
  nodes,
})
