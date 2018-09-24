/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { Translate } from 'react-redux-i18n'
import Button from '../components/Button/Button'
import {
  navigateToSelectWallet,
  navigateToRecoverAccountPage,
} from '../thunks/navigation'
import UserRow from '../components/UserRow/UserRow'
import {
  FORM_LOGIN_PAGE,
  FORM_LOGIN_PAGE_FIELD_SUCCESS_MESSAGE
} from '../common/formConstants'
import * as AccountSelectors from '../selectors/accounts'
import './styles/LoginForm.scss'

const mapStateToProps = (state) => {
  const accounts = state.accounts
  console.log(accounts)
  const list = AccountSelectors.selectAccountList(state)
  const selected = AccountSelectors.selectAccountSelected(state)
  const formSelector = formValueSelector(FORM_LOGIN_PAGE)

  return {
    list,
    selected,
    successMessage: formSelector(state, FORM_LOGIN_PAGE_FIELD_SUCCESS_MESSAGE),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: async (values) => {
      const password = values.get('password')
      await dispatch(onSubmitLoginForm(password))
    },
    onSubmitFail: (errors, dispatch, submitErrors) => dispatch(onSubmitLoginFormFail(errors, submitErrors)),
    navigateToSelectWallet: () => dispatch(navigateToSelectWallet()),
    navigateToRecoverAccountPage: () => dispatch(navigateToRecoverAccountPage()),
  }
}

class LoginForm extends Component {
  static propTypes = {
    initLoginPage: PropTypes.func,
    navigateToRecoverAccountPage: PropTypes.func,
    handleSubmit: PropTypes.func,
    navigateToSelectWallet: PropTypes.func,
    selectedWallet: PropTypes.object,
    successMessage: PropTypes.string,
    classes: PropTypes.any,
    error: PropTypes.string,
    submitting: PropTypes.bool,
  }

  renderSuccessMessage = () => {
    const { successMessage } = this.props

    if (!successMessage) {
      return null
    }

    return (
      <div styleName='success-message'>
        {successMessage}
      </div>
    )
  }

  renderDefaultTypeForm = () => {
    const { classes, submitting, error, navigateToRecoverAccountPage } = this.props

    return (
      <div>
        <div styleName='field'>
          <Field
            component={TextField}
            name='password'
            type='password'
            label={<Translate value='LoginForm.enterPassword' />}
            fullWidth
            InputProps={{ className: classes.input }}
          />
        </div>

        <div styleName='actions'>
          <Button
            styleName='button'
            buttonType='login'
            type='submit'
            label={<Translate value='LoginForm.submitButton' />}
            isLoading={submitting}
          />
          {
            error
              ? (<div styleName='form-error'>{error}</div>)
              : null
          }
          <button onClick={navigateToRecoverAccountPage} styleName='link'>
            <Translate value='LoginForm.forgotPassword' />
          </button>
        </div>
      </div>
    )
  }

  renderDeviceTypeForm = () => {
    const { error, submitting } = this.props

    return (
      <div styleName='actions'>
        <Button
          styleName='button'
          buttonType='login'
          type='submit'
          label={<Translate value='LoginForm.submitButton' />}
          isLoading={submitting}
        />
        {
          error
            ? (<div styleName='form-error'>{error}</div>)
            : null
        }
      </div>
    )
  }

  renderType = () => {
    const { selectedWallet } = this.props

    if (!selectedWallet || !selectedWallet.type) {
      return this.renderDefaultTypeForm()
    }

    switch (selectedWallet.type) {
      case WALLET_TYPE_MEMORY:
        return this.renderDefaultTypeForm()

      case WALLET_TYPE_LEDGER:
      case WALLET_TYPE_TREZOR:
      case WALLET_TYPE_METAMASK:
        return this.renderDeviceTypeForm()

      default:
        return this.renderDefaultTypeForm()
    }
  }

  render () {
    const {
      handleSubmit,
      navigateToSelectWallet,
      selectedWallet,
    } = this.props

    return (
      <form styleName='form' name={FORM_LOGIN_PAGE} onSubmit={handleSubmit}>
        <div styleName='page-title'>
          <Translate value='LoginForm.title' />
        </div>

        {this.renderSuccessMessage()}

        <input type='hidden' name={FORM_LOGIN_PAGE_FIELD_SUCCESS_MESSAGE} />

        <div styleName='user-row'>
          <UserRow
            title={getAccountName(selectedWallet)}
            subtitle={getAccountAddress(selectedWallet, true)}
            avatar={getAccountAvatar(selectedWallet)}
            onClick={navigateToSelectWallet}
            linkTitle='My Accounts'
          />

          {
            this.renderType()
          }

        </div>
      </form>
    )
  }
}

const form = reduxForm({ form: FORM_LOGIN_PAGE })(LoginForm)
export default connect(mapStateToProps, mapDispatchToProps)(form)
