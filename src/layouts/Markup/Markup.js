/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { Translate } from 'react-redux-i18n'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider'
import IconButton from '@material-ui/core/es/IconButton/IconButton'

import menu from './menu'
import {
  selectSidesStackLength,
} from '../../redux/sides/selectors'
import {
  selectSessionType,
} from '@chronobank/auth/redux/session/selectors'
import { selectNotifierNotice } from '../../redux/notifier/selectors'
import { closeNotifier } from '../../redux/notifier/thunks'
import ModalStack from '../../containers/ModalStack'
import { toggleMainMenu } from '../../redux/sides/thunks'
import SideStack from '../../containers/SideStack'
import Snackbar from '../../components/Snackbar'
import HeaderPartial from '../partials/HeaderPartial'
import DrawerMainMenu from '../partials/DrawerMainMenu'
import BUTTONS from '../../components/TopButtons/buttons'

import './Markup.scss'
import theme from '../../styles/themes/default'

function mapStateToProps (state) {
  return {
    notice: selectNotifierNotice(state),
    mainMenuIsOpen: selectSessionType(state),
    modalStackSize: selectSidesStackLength(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleCloseNotifier: () => dispatch(closeNotifier()),
    onToggleMainMenu: (mainMenuIsOpen) => dispatch(toggleMainMenu(mainMenuIsOpen)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Markup extends PureComponent {
  static propTypes = {
    modalStackSize: PropTypes.number,
    notice: PropTypes.instanceOf(Object),
    handleCloseNotifier: PropTypes.func,
    children: PropTypes.node,
    location: PropTypes.shape({
      action: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      query: PropTypes.object,
      search: PropTypes.string,
      state: PropTypes.string,
    }),
    onToggleMainMenu: PropTypes.func,
    mainMenuIsOpen: PropTypes.bool,
  }

  handleToggleMainMenu = () => {
    this.props.onToggleMainMenu(!this.props.mainMenuIsOpen)
  }

  handleToggleMainMenuAndScroll = () => {
    window.scrollTo(0, 0)
    this.contentWrapper.scrollTo(0, 0)
    this.handleToggleMainMenu()
  }

  setRef = (el) => {
    this.contentWrapper = el
  }

  renderPageTitle = () => {
    const { pathname } = this.props.location
    let currentPage = null

    const filter = (item) => {
      if (item.path === pathname) {
        currentPage = item
      }
    }
    menu.user.map(filter)
    if (!currentPage) {
      menu.cbe.map(filter)
    }

    if (!currentPage) {
      Object.keys(BUTTONS).forEach((path) => {
        if (path === pathname) {
          currentPage = BUTTONS[path]
        }
      })
    }

    if (currentPage) {
      return <Translate value={currentPage.title} />
    }
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div styleName={classnames('root', { 'noScroll': this.props.modalStackSize > 0 })}>
          <div styleName={classnames('mainMenu', { 'open': this.props.mainMenuIsOpen })}>
            <DrawerMainMenu onSelectLink={this.handleToggleMainMenuAndScroll} />
            <div styleName='overlay' onClick={this.handleToggleMainMenu} />
          </div>
          <div styleName='middle'>
            <div styleName='middleTop'>
              <div styleName='mainMenuToggle'>
                <IconButton onClick={this.handleToggleMainMenu}>
                  <i className='material-icons'>menu</i>
                </IconButton>
              </div>
              <div styleName='pageTitle'>
                {this.renderPageTitle()}
              </div>
              <HeaderPartial location={this.props.location} />
            </div>
            <div styleName='middleSnackbar'>
              <div styleName='middleSnackbarPanel'>
                {this.props.notice
                  ? (
                    <Snackbar
                      notice={this.props.notice}
                      autoHideDuration={4000}
                      onRequestClose={this.props.handleCloseNotifier}
                    />)
                  : null
                }
              </div>
            </div>
            <div styleName='middleContent' id='contentWrapper' ref={this.setRef}>
              {this.props.children}
            </div>
          </div>
          <div styleName='middleBottom' />
          <SideStack />
          <ModalStack />
        </div>
      </MuiThemeProvider>
    )
  }
}
