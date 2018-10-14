/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import StartPage from './StartPage'
import { selectAccountList } from '@chronobank/auth/redux/accounts'
import {
  navigateToCreateAccount,
  navigateToSelectImportMethod,
} from '../../redux/navigation'

const mapStateToProps = (state) => {
  const accountList = selectAccountList(state)
  return {
    accountList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToCreateAccount: () => dispatch(navigateToCreateAccount()),
    navigateToSelectImportMethod: () => dispatch(navigateToSelectImportMethod()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
