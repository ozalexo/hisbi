import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router/immutable'
import thunk from 'redux-thunk'

export default (history) => {
  const middleware = [
    thunk,
    routerMiddleware(history)
    // primaryNodesReduxMiddleware,
    // chronobankMiddlewaresReduxMiddleware,
    // axiosMiddleware,
  ]
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  if (isDevelopmentEnv) {
    // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
    middleware.push(createLogger({
      collapsed: true
    }))
  }

  return middleware
}
