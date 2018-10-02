/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnly'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { persistReducer } from 'redux-persist'
// import { Map } from 'immutable'
import { persistStore } from 'redux-persist'
import accounts from '@chronobank/auth/redux/accounts/reducer'
import wallets from '@chronobank/auth/redux/wallets/reducer'
import getMiddlewares from './middlewares'
import rootReducer, { accountsPersistConfig, walletsPersistConfig } from './rootReducer'

const initialState = {}

const configureStore = () => {
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  const composeEnhancers = isDevelopmentEnv
    ? composeWithDevTools({ realtime: true })
    : compose

  const history = createBrowserHistory()

  const middleware = getMiddlewares(history)

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware)
  )(createStore)

  const store = createStoreWithMiddleware(
    connectRouter(history)(rootReducer),
    initialState,
  )

  const persistor = persistStore(store)

  // TODO: issue: accounts and weallets ducks contains unnecessary '_persist' value
  // TODO: need to wotk with HMR correctly
  if (module.hot) {
    console.log('Hot', module.hot)
    module.hot.accept( () => {
      // This fetch the new state of the above reducers.
      console.log('Hot reducer releacements')
      store.replaceReducer(
        persistReducer(accountsPersistConfig, accounts)
      )
      store.replaceReducer(
        persistReducer(walletsPersistConfig, wallets)
      )
      store.persistor.persist()
    })
  }

  store.persistor = persistor
  return { store, history, persistor }
}

export default configureStore
