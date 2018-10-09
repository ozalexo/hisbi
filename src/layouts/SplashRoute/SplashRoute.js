/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import Splash from '../Splash'

const SplashRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
    <Splash>
        <Component {...matchProps} />
      </Splash>
    )} />
  )
}

export default SplashRoute

// export default class SplashRoute extends PureComponent {
//   render () {
//     console.log(this.props)
//     return (
//       <Splash>
//         <Route
//           {...this.props}
//         />
//       </Splash>
//     )
//   }
// }
