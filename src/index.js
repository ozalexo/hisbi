/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { withRouter } from 'react-router-dom'
import { ConnectedRouter, push } from 'connected-react-router'
import { Provider } from 'react-redux'
import * as Initializers from './store/initializers'
import './index.scss'
import defaultTheme from './themes/default'
import configureStore from './store/configureStore'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const testCreateMemoryAccount = () => {}
const testLoginWithMemoryAccount = () => {}

const initAfterRehydration = () => {
  // Initializers.initI18N(store)
  try {
    Initializers.initPrimaryNodes(store)
    Initializers.initMarket(store)
    Initializers.initTrezor(store)
    testCreateMemoryAccount()
    testLoginWithMemoryAccount()

    // const state = store.getState()
    // let path = '/'
    // if (state.accounts.list.length > 0) {
    //   // path = '/select-account'
    //   path = '/'
    // }
    // store.dispatch(push(path))
  } catch (error) {
    // TODO: Q: automatic switch to another available node? But what if user tried to connect to custom node?
    // eslint-dicanle-next-line no-console
    console.log('Error during App initialization:', error)
  }
}

const { store, history, persistor } = configureStore()
const NonBlockApp = withRouter(App)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loader={null}
      persistor={persistor}
      onBeforeLift={initAfterRehydration}
    >
      <MuiThemeProvider theme={defaultTheme}>
        <ConnectedRouter history={history}>
          <NonBlockApp />
        </ConnectedRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
