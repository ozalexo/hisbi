import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { withRouter } from 'react-router'
import { ConnectedRouter, push } from 'connected-react-router'
import { Provider } from 'react-redux'
import './index.scss'
import defaultTheme from './themes/default'
import configureStore from './store/configureStore'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

let i18nJson

const { store, history, persistor } = configureStore()
const NonBlockApp = withRouter(App)

const initAfterRehydration = () => {
  const state = store.getState()
  let path = '/'
  if (state.accounts.list.length > 0) {
    path = '/select-account'
  }
  store.dispatch(push(path))
}

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
