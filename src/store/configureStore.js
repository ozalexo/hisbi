import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnly'
import { connectRouter } from 'connected-react-router/immutable'
import { createBrowserHistory } from 'history'
// import { Map } from 'immutable'
import { persistStore } from 'redux-persist'
import getMiddlewares from './middlewares'
import rootReducer from './rootReducer'

const initialState = {}

const configureStore = () => {
  console.log(process.env)
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

  return { store, history, persistor }
}

export default configureStore
