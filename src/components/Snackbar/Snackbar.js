/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Translate } from 'react-redux-i18n'
import classnames from 'classnames'

import './Snackbar.scss'

export default class Snackbar extends PureComponent {
  static propTypes = {
    notice: PropTypes.object,
    autoHideDuration: PropTypes.number,
    onRequestClose: PropTypes.func,
  }

  static defaultProps = {
    autoHideDuration: 4000,
  }

  constructor (props) {
    super(props)
    this.state = {
      notice: props.notice,
      timeout: props.notice
        ? setTimeout(() => {
          this.handleRequestClose()
        }, props.autoHideDuration)
        : null,
    }
  }

  // TODO: to fix obsolete react lifecycle
  UNSAFE_componentWillReceiveProps (newProps) {
    if (newProps.notice !== this.state.notice) {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout)
      }
      this.setState({
        notice: newProps.notice,
        timeout: newProps.notice
          ? setTimeout(() => {
            this.handleRequestClose()
          }, this.props.autoHideDuration)
          : null,
      })
    }
  }

  handleRequestClose () {
    if (typeof this.props.onRequestClose === 'function') {
      this.props.onRequestClose()
    }
  }

  render () {
    const notice = this.props.notice
    const address = notice.address()
    const isErrorNotice = notice.constructor.name.toLowerCase().indexOf('error') >= 0

    return (
      <div styleName={classnames('snackbar', { 'error-notice': isErrorNotice })}>
        <span styleName='snackbar-entry'>
          <Translate
            styleName='entry-status'
            value={notice.title()}
          />
        </span>
        <span styleName='snackbar-entry'>
          <Translate
            styleName='entry-value'
            {...notice.message()}
          />
        </span>
        {address
          ? (
            <span styleName='snackbar-entry'>
              <span styleName='entry-value'>{address}</span>
            </span>
          )
          : null
        }
      </div>
    )
  }
}
