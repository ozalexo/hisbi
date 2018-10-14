/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Input from '@material-ui/core/Input'
import { createInMemoryAccount } from '@chronobank/auth/redux/accounts/thunks'
// import EnterMnemonicForm from '../../components/EnterMnemonicForm'

const mapDispatchToProps = (dispatch) => ({
  createInMemoryAccount: (accountTitle, mnemonic, password) =>
    dispatch(createInMemoryAccount(accountTitle, mnemonic, password)),
})

class EnterMnemonicFormContainer extends PureComponent {
  static propTypes = {
    handleSubmitMnemonic: PropTypes.func,
  }

  handleSubmitMnemonic = (mnemonic) =>
    this.props.createInMemoryAccount('Test Wallet', 'decade light person nest wagon spy swarm merge surge answer kingdom wolf', '111')

  render () {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleSubmitMnemonic)}>
        <FormControl fullWidth>
          <Input
            fullWidth
            placeholder='Enter mnemonic'
            inputProps={{
              'aria-label': 'Enter mnemonic phrase',
            }}
          />
        </FormControl>
      </form>
    )
  }
}

const EnterMnemonicFormConfig = {
  form: 'EnterMnemonicForm',
  destroyOnUnmount: true,
}

export default compose(
  reduxForm(EnterMnemonicFormConfig),
  connect(null, mapDispatchToProps),
)(EnterMnemonicFormContainer)
