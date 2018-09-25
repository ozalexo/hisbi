import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
// import LoginForm from './pages/LoginForm'
// import AccountSelector from './pages/AccountSelector'
import DemoPage from './pages/DemoPage'

// class App extends Component {
//   render () {
//     console.log('Renders')
//     return (
//       <div>
//         <Switch>
//           <Route exact path='/' component={LoginForm} />
//           <Route exact path='/start' component={StartPage} />
//           <Route component={() => (<div>Miss</div>)} />
//         </Switch>
//       </div>
//     )
//   }
// }

class App extends Component {
  render () {
    console.log('Renders')
    return (
      <div>
        <Switch>
          <Route exact path='/' component={DemoPage} />
          <Route component={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    )
  }
}

export default hot(module)(App)
