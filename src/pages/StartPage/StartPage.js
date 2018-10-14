/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import AccountRow from '../../components/AccountRow'
import Button from '../../components/Button'
import IconArrow from '../../assets/img/icons/prev-white.svg'

import './StartPage.scss'

export default class StartPage extends PureComponent {
  static propTypes = {
    accountList: PropTypes.arrayOf(PropTypes.object),

    handleAccountSelect: PropTypes.func,
    navigateToCreateAccount: PropTypes.func,
    navigateToSelectImportMethod: PropTypes.func,
  }

  static defaultProps = {
    handleAccountSelect: () => {},
    accountList: [],
  }

  renderAccountList () {
    const { accountList } = this.props

    if (!accountList || !(accountList.length === 0)) {
      return (
        <div styleName='empty-list'>
          <Translate value='AccountSelector.emptyList' />
        </div>
      )
    }

    return (
      <div styleName='wallets-list'>
        {
          accountList.map((account, i) => (
            <AccountRow
              key={i.toString()}
              title={account.title}
              subtitle={account.address}
              avatar={account.avatar}
              actionIcon={IconArrow}
              reverseIcon
              onClick={this.props.handleAccountSelect}
            />
          ))
        }
      </div>
    )
  }

  handleNavigateToSelectImportMethod = () => {
    this.props.navigateToSelectImportMethod()
  }

  handleNavigateToCreateAccount = () => {
    this.props.navigateToCreateAccount()
  }

  render () {
    return (
      <div styleName='wrapper'>
        <div styleName='page-title'>
          <Translate value='AccountSelector.title' />
        </div>

        <div styleName='description'>
          <Translate value='AccountSelector.description' />
          <br />
          <Translate value='AccountSelector.descriptionExtra' />
        </div>

        <div styleName='content'>
          {
            this.renderAccountList()
          }

          <div styleName='actions'>
            <Button
              styleName='button'
              buttonType='login'
              onClick={this.handleNavigateToSelectImportMethod}
            >
              <Translate value='AccountSelector.button' />
            </Button>
            <Translate value='AccountSelector.or' />
            &nbsp;
            <br />
            <button onClick={this.handleNavigateToCreateAccount} styleName='link'>
              <Translate value='AccountSelector.createAccount' />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
