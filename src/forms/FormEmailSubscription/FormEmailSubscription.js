/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Field, reduxForm, formPropTypes, SubmissionError, stopSubmit } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { Translate } from 'react-redux-i18n'
import classnames from 'classnames'
// import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { requestSubscribeNews } from '@chronobank/nodes/api/backend_chronobank'
import { FORM_FOOTER_EMAIL_SUBSCRIPTION } from '../../forms/constants'
import Button from '../../components/Button'
import spinner from '../../assets/img/spinningwheel-1.gif'
import validate from './validate'

import * as styles from './FormEmailSubscription.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      return dispatch(requestSubscribeNews({ email: values.email }))
        .catch((error) => {
          console.log(error)
          throw new SubmissionError({ _error: error && error.message })
        })
    },
    onSubmitFail: (errors, dispatch, submitErrors) =>
      dispatch(stopSubmit(FORM_FOOTER_EMAIL_SUBSCRIPTION, submitErrors && submitErrors.errors)),
  }
}

class FormEmailSubscription extends PureComponent {

  static propTypes = {
    ...formPropTypes,
  }

  // TODO: do not mix success and errors
  renderFormMessage () {
    const { submitSucceeded, error } = this.props
    const msgClasses = classnames({
      subscriptionSubmitSucceeded: submitSucceeded,
      subscriptionSubmitError: error,
    })

    return (
      <div styleName={msgClasses}>
        {
          submitSucceeded
            ? 'Thank you for subscribing!'
            : error
        }
      </div>
    )
  }

  render () {
    const {
      submitSucceeded,
      error,
      handleSubmit,
      submitting,
    } = this.props

    return (
      <form
        name={FORM_FOOTER_EMAIL_SUBSCRIPTION}
        styleName='subscription'
        onSubmit={handleSubmit}
      >
        <div styleName='subscription-input'>
          {
            (submitSucceeded || error)
              ? this.renderFormMessage()
              : (
                <Field
                  component={TextField}
                  name='email'
                  inputProps={{
                    className: styles.emailField,
                  }}
                  placeholder='Enter email to subscribe for newsletter'
                  fullWidth
                />
              )
          }
        </div>
        <div styleName='subscription-button'>
          {submitting ? (
            <img
              src={spinner}
              styleName='spinner'
              alt=''
              width={24}
              height={24}
            />
          ) : (null)}
          <Button
            styleName='button'
            type='submit'
            disabled={submitting}
            label={<Translate value='subscribe' />}
          />
        </div>
      </form>
    )
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({ form: FORM_FOOTER_EMAIL_SUBSCRIPTION, validate }),
)(FormEmailSubscription)
