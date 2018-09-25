import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
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

const reducerA = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const reducerB = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export default combineReducers({
  accounts: persistReducer(accountPersistConfig, accounts),
  reducerA,
  reducerB
})
