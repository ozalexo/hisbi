/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { selectModalsStack } from '../../redux/modals/selectors'
import ModalsSelector from './ModalSelector'

import './ModalStack.scss'

const mapStateToProps = (state) => {
  return {
    stack: selectModalsStack(state),
  }
}


class ModalStack extends PureComponent {
  static propTypes = {
    stack: PropTypes.array,
  }

  render () {
    return (
      <div styleName='root'>
        {
          this.props.stack
            .map((modal) => (
              <ModalsSelector {...modal} />
            ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(ModalStack)
