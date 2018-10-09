/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import Markup from '../Markup'

class MarkupRoute extends PureComponent {
  render () {
    return (
      <Markup>
        <Route
          {...this.props}
        />
      </Markup>
    )
  }
}

export default MarkupRoute
