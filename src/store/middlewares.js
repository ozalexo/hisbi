/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router/immutable'
import thunk from 'redux-thunk'
import axiosMiddleware from '@chronobank/nodes/redux/middlewares/axios'
import web3middleware from '@chronobank/nodes/redux/middlewares/web3'
import rabbitmqMmiddleware from '@chronobank/nodes/redux/middlewares/rabbitmq'

export default (history) => {
  const middleware = [
    thunk,
    routerMiddleware(history),
    axiosMiddleware,
    web3middleware,
    rabbitmqMmiddleware,
  ]
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  if (isDevelopmentEnv) {
    // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
    middleware.push(createLogger({
      collapsed: true,
    }))
  }

  return middleware
}
