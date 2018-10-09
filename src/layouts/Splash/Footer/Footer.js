/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { Translate } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import FormEmailSubscription from '../../../forms/FormEmailSubscription'


import LogoChronobankFull from '../../../assets/img/logo-chrono-bank-full.svg'
import PlayWhite from '../../../assets/img/play-white.svg'
import AppstoreWhite from '../../../assets/img/appstore-white.svg'
import facebook from '../../../assets/img/facebook.svg'
import reddit from '../../../assets/img/reddit.svg'
import instagram from '../../../assets/img/instagram.svg'
import github from '../../../assets/img/github.svg'
import twitter from '../../../assets/img/twitter.svg'
import telegramm from '../../../assets/img/telegramm.svg'
import StripesToCropFooter from '../../../assets/img/stripes-2-crop-footer.jpg'

import './Footer.scss'

export default class Footer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render () {
    return (
      <div styleName='footer'>
        <div styleName='footer-container'>
          <div styleName='flex'>
            <div styleName='navigation'>
              <div styleName='navigation-chrono-logo-container'>
                <img styleName='navigation-chrono-logo' src={LogoChronobankFull} alt='' />
              </div>

              <ul styleName='navigation-menu navigation-list'>
                <li>
                  <Link to='/' href styleName='footerLink'>
                    Home
                  </Link>
                </li>
                <li>
                  <a href='https://chronobank.io/products/laborx' styleName='footerLink'>
                    LaborX
                  </a>
                </li>
                <li>
                  <a href='https://chronobank.io/team' styleName='footerLink'>
                    Team
                  </a>
                </li>
                <li>
                  <a href='https://chronobank.io/faq' styleName='footerLink'>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href='https://blog.chronobank.io/' styleName='footerLink'>
                    Blog
                  </a>
                </li>
                <li>
                  <a href='https://chronobank.io/files/business_outline.pdf' styleName='footerLink'>
                    Business Outline
                  </a>
                </li>
                <li>
                  <a href='https://chronobank.io/files/dev_plan.pdf' styleName='footerLink'>
                    Development Plan
                  </a>
                </li>
                <li>
                  <a href='https://files.chronobank.io/files/Chronobank_WP.pdf' styleName='footerLink'>
                    White Paper
                  </a>
                </li>
              </ul>

            </div>

            <div styleName='downloads'>
              <div styleName='title-container'>
                <span styleName='title'>Downloads</span>
              </div>

              <div styleName='ios-market-logo-container'>
                <img styleName='ios-market-logo ' src={AppstoreWhite} alt='' />
              </div>

              <div styleName='android-market-logo-container'>
                <img styleName='android-market-logo ' src={PlayWhite} alt='' />
              </div>

              <ul styleName='navigation-list'>
                <li>Desktop App (Windows)</li>
                <li>Desktop App (MacOS)</li>
              </ul>

            </div>

            <div styleName='connect'>
              <div styleName='title-container'>
                <span styleName='title'>Connect with us</span>
              </div>
              <div styleName='logos-container'>
                <div styleName='logo-wrapper'>
                  <a href='https://www.facebook.com/ChronoBank.io' styleName='resource-link'>
                    <img styleName='resource-img' src={facebook} alt='' />
                  </a>
                </div>
                <div styleName='logo-wrapper'>
                  <a href='https://twitter.com/ChronobankNews' styleName='resource-link'>
                    <img styleName='resource-img' src={twitter} alt='' />
                  </a>
                </div>
                <div styleName='logo-wrapper'>
                  <a href='https://www.instagram.com/chronobank.io/' styleName='resource-link'>
                    <img styleName='resource-img' src={instagram} alt='' />
                  </a>
                </div>
                <div styleName='logo-wrapper'>
                  <a href='https://www.reddit.com/r/ChronoBank/' styleName='resource-link'>
                    <img styleName='resource-img' src={reddit} alt='' />
                  </a>
                </div>
                <div styleName='logo-wrapper'>
                  <a href='https://telegram.me/chronobank' styleName='resource-link'>
                    <img styleName='resource-img' src={telegramm} alt='' />
                  </a>
                </div>
                <div styleName='logo-wrapper'>
                  <a href='https://github.com/ChronoBank' styleName='resource-link'>
                    <img styleName='resource-img' src={github} alt='' />
                  </a>
                </div>
              </div>

              <ul styleName='navigation-list'>
                <li styleName='first'>
                  <a href='mailto:info@chronobank.io' styleName='footerLink'>
                    info@chronobank.io
                  </a>
                </li>
                <li>
                  <a href='mailto:support@chronobank.io' styleName='footerLink'>
                    support@chronobank.io
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div styleName='subscription-form-wrapper'>
            <FormEmailSubscription />
          </div>

        </div>
        <div styleName='copyright'>
          <span styleName='copyright-text'>
            {<Translate value='copyright' />}
          </span>
        </div>

        <img styleName='background' src={StripesToCropFooter} alt='' />

      </div>
    )
  }
}
