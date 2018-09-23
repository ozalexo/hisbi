import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import logo from './logo.svg'
import './App.scss'

const { store, history, persistor } = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className='App'>
            <header className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <h1 className='App-title'>Welcome to React 1</h1>
            </header>
            <p className='App-intro'>
              To get started, edit <code>src/App.js</code> and save to reload 36.
            </p>
          </div>
        </PersistGate>
      </Provider>
    )
  }
}

export default hot(module)(App)
