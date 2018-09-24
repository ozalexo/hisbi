/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { Translate } from 'react-redux-i18n'
import React, { PureComponent } from 'react'
import Button from 'components/common/ui/Button/Button'
import {
  navigateToSelectImportMethod,
  navigateToCreateAccount
} from '../thunks/navigation'
import './styles/StartPage.scss'

export default class StartPage extends PureComponent {
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
          <div styleName='wallets-list'>
            <div styleName='empty-list'>
              <Translate value='AccountSelector.emptyList' />
            </div>
          </div>

          <div styleName='actions'>
            <Button
              styleName='button'
              buttonType='login'
              onClick={navigateToSelectImportMethod}
            >
              <Translate value='AccountSelector.button' />
            </Button>
            <Translate value='AccountSelector.or' />
            &nbsp;<br />
            <button onClick={navigateToCreateAccount} styleName='link'>
              <Translate value='AccountSelector.createAccount' />
            </button>
          </div>
        </div>

      </div>
    )
  }
}
