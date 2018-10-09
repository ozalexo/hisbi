import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
// import LoginForm from './pages/LoginForm'
// import AccountSelector from './pages/AccountSelector'
import DemoPageContainer from './pages/DemoPageContainer'
import SplashRoute from './layouts/SplashRoute'
// import MarkupRoute from './layouts/MarkupRoute'

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

// const publicRoutes = {
//     Login: {
//         component: DemoPageContainer,
//         path: '/'
//     },
// }
// const privateRoutes = {}


class App extends Component {
  render () {
    return (
      <Switch>
        <SplashRoute exact path='/' component={DemoPageContainer} />
        {/* <MarkupRoute exact path='/test' component={DemoPageContainer} /> */}
        {/* <Route exact path='/' component={DemoPageContainer} />*/}
        <Route component={() => (<div>Miss</div>)} />
      </Switch>
    )
  }
}

export default hot(module)(App)
