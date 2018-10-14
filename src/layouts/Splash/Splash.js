/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// TODO: [AO] why do we have another one MuiThemeProvider in this file?


import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'

import CommonNetworkSelector from '../../containers/CommonNetworkSelector/CommonNetworkSelector'
import Footer from './Footer'
import * as NavigationActions from '../../redux/navigation'
import BackIcon from '../../assets/img/icons/back.svg'
import ChronoLogo from '../../assets/img/logo-chrono-bank-full.svg'
import ChronoWalletLogoBright from '../../assets/img/chronowalletlogobright.svg'
import ChronoWalletTextBright from '../../assets/img/chronowallettextbright.svg'
import ModalStack from '../../containers/ModalStack'
import StripesToCrop from '../../assets/img/stripes-2-crop.jpg'
import WalletTitleBG from '../../assets/img/wallet-title-bg.png'

import './Splash.scss'
import theme from './styles'

const mapDispatchToProps = (dispatch) => {
  return {
    navigateBack: () => dispatch(NavigationActions.navigateBack()),
    navigateToLoginPage: () => dispatch(NavigationActions.navigateToLoginPage()),
  }
}

class Splash extends Component {
  static propTypes = {
    children: PropTypes.node,
    navigateBack: PropTypes.func,
    navigateToLoginPage: PropTypes.func,
    navigatorText: PropTypes.string,
  }

  static defaultProps = {
    navigateBack: null,
    navigatorText: '',
  }

  render () {
    const { children, navigateBack, navigatorText, navigateToLoginPage } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div styleName='root'>
          <div styleName='header-container'>
            <a styleName='header-logo' href='https://chronobank.io/'>
              <img styleName='chrono-logo' src={ChronoLogo} alt='' />
            </a>
            <div styleName='header-picture'>
              <img src={StripesToCrop} alt='' />
            </div>
            <div styleName='header-picture-crop'>
              <img src={WalletTitleBG} alt='' />
            </div>
            <button onClick={navigateToLoginPage} styleName='header-center'>
              <img styleName='chrono-wallet-logo-bright' src={ChronoWalletLogoBright} alt='' />
              <img styleName='chrono-wallet-text-bright' src={ChronoWalletTextBright} alt='' />
            </button>
            <div styleName='selectors'>
              <div styleName='network-selector'>
                <CommonNetworkSelector />
              </div>
            </div>
          </div>

          {
            navigateBack ? (
              <div styleName='header-navigator'>
                <button styleName='back-button' onClick={navigateBack}>
                  <img src={BackIcon} alt='' />
                </button>
                <span styleName='navigator-text'>
                  { navigatorText }
                </span>
              </div>
            ) : null
          }
          {
            children
              ? children
              : null
          }
          {
            !window.isMobile && <Footer />
          }
          <ModalStack />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(null, mapDispatchToProps)(Splash)
