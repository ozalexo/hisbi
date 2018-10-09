/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import SideSelector from './SideSelector'
import { selectSidesStack } from '../../redux/sides/selectors'

import './SideStack.scss'

const mapStateToProps = (state) => ({
  stack: selectSidesStack(state),
})

@connect(mapStateToProps)
export default class SideStack extends PureComponent {
  static propTypes = {
    stack: PropTypes.objectOf(PropTypes.object),
  }

  render () {
    return (
      <div styleName='root'>
        {
          this.props.stack && Object.values(this.props.stack)
            .map((panel) => <SideSelector key={panel.panelKey} {...panel} />)
        }
      </div>
    )
  }
}
