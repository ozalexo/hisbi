/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { selectAllWalletsPendingTransactionsLength } from '@chronobank/core/redux/selectors'
import { sidesOpen } from '../../../redux/sides/thunks'
import { NOTIFICATION_PANEL_KEY } from '../../../redux/sides/constants'
import Button from '../../../components/Button'
import TopButtons from '../../../components/TopButtons'
// import LocaleDropDown from '../../../layouts/partials/LocaleDropDown'

import './HeaderPartial.scss'

const mapStateToProps = (state) => {
  return {
    pendingTransactionsLength: selectAllWalletsPendingTransactionsLength(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNotificationTap: () => {
      dispatch(sidesOpen({
        componentName: 'NotificationContent',
        panelKey: NOTIFICATION_PANEL_KEY,
        isOpened: true,
        className: 'notifications',
        drawerProps: {
          variant: 'temporary',
          anchor: 'right',
          width: 300,
        },
      }))
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderPartial extends Component {
  static propTypes = {
    handleNotificationTap: PropTypes.func,
    pendingTransactionsLength: PropTypes.number,
    location: PropTypes.shape({
      action: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      query: PropTypes.object,
      search: PropTypes.string,
      state: PropTypes.string,
    }),
  }

  getNotificationButtonClass = () => {
    return this.props.pendingTransactionsLength > 0
      ? 'pending'
      : 'raised'
  }

  render () {
    const buttonClass = this.getNotificationButtonClass()

    return (
      <div styleName='root'>
        <div styleName='actions'>
          <TopButtons location={this.props.location} />
          {/* <LocaleDropDown /> */}
          <Button styleName='action' buttonType={buttonClass} onClick={this.props.handleNotificationTap}>
            <i className='material-icons'>notifications</i>
          </Button>
        </div>
      </div>
    )
  }
}
