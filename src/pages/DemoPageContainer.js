/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import DemoPage from './DemoPage'
import { createInMemoryAccount } from '@chronobank/auth/redux/accounts/thunks'

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
  createInMemoryAccount: (mnemonic) => dispatch(createInMemoryAccount('TestWallet', mnemonic, '111')),
})

export default connect(mapStateToProps, mapDispatchToProps)(DemoPage)
