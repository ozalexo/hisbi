/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnly'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'
import getMiddlewares from './middlewares'
import createRootReducer from './rootReducer'
import ROOT_PERSIST_CONFIG from './persist'

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

  const rootReducer = createRootReducer()

  const store = createStoreWithMiddleware(
    connectRouter(history)(rootReducer),
    initialState,
  )

  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept( () => {

      let nextRootReducer = createRootReducer()
      if (ROOT_PERSIST_CONFIG.active) {
        const persistConfig = ROOT_PERSIST_CONFIG.storeConfig
        nextRootReducer = persistReducer(persistConfig, rootReducer)
      }

      store.replaceReducer(nextRootReducer)
    })
  }

  store.persistor = persistor
  return { store, history, persistor }
}

export default configureStore
