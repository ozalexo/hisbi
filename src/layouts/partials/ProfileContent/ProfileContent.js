/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { Translate } from 'react-redux-i18n'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { TOKEN_ICONS } from '../../../assets'
import { logoutAndNavigateToRoot } from '../../../redux/ui/thunks'
import { selectCurrentNetworkTitle } from '@chronobank/nodes/redux/nodes/selectors'

import { selectAllMainWallets } from '../../../redux/ui/selectors'
import { modalsOpen } from '../../../redux/modals/actions'
import IPFSImage from '../../../components/IPFSImage'

// import CopyIcon from '../../../components/dashboard/MicroIcon/CopyIcon'
// import QRIcon from '../../../components/dashboard/MicroIcon/QRIcon'
// import PKIcon from '../../../components/dashboard/MicroIcon/PKIcon'

import './ProfileContent.scss'
import { prefix } from './lang'

function mapStateToProps (state) {
  const session = state.get('session')
  const networkTitle = selectCurrentNetworkTitle(state)
  const mainWallets = selectAllMainWallets(state)
  return {
    networkTitle,
    account: session.account,
    profile: session.profile,
    mainWallets,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleProfileEdit: (data) => dispatch(modalsOpen({
      componentName: 'UpdateProfileDialog',
      data,
    })),
    handleLogout: () => dispatch(logoutAndNavigateToRoot()),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class ProfileContent extends PureComponent {

  static propTypes = {
    account: PropTypes.string,
    networkTitle: PropTypes.string,
    handleLogout: PropTypes.func,
    handleProfileEdit: PropTypes.func,
    onProfileClose: PropTypes.func,
    profile: PropTypes.any,
    tokens: PropTypes.any,
  }

  static defaultProps = {
    onProfileClose: () => {
    },
  }

  handleProfileClose = () => {
    this.props.onProfileClose()
  }

  render () {
    return (
      <div styleName='profile'>

        <div styleName='close-icon' onClick={this.handleProfileClose}>
          <i className='chronobank-icon'>close</i>
        </div>

        <div styleName='network-name'>
          <div styleName='network-name-text'>
            {this.props.networkTitle}
          </div>
        </div>

        <div styleName='account-info'>
          <div styleName='account-info-avatar'>
            <div styleName='avatar-icon'>
              <IPFSImage
                styleName='avatar-icon-content'
                multihash={this.props.profile.icon()}
                icon={
                  <i
                    styleName='default-icon'
                    color='white'
                    className='material-icons'
                  >account_circle
                  </i>
                }
              />
            </div>
          </div>
          <div styleName='account-info-name'>
            <div styleName='account-name-text'>
              {this.props.profile.name() || 'Account name'}
            </div>
          </div>
          <div styleName='account-info-icons'>
            <div styleName='account-info-setting' onClick={this.props.handleProfileEdit}>
              <i className='material-icons'>settings</i>
            </div>
            <div styleName='account-info-setting' onClick={this.props.handleLogout}>
              <i className='material-icons'>power_settings_new</i>
            </div>
          </div>
        </div>

        <div styleName='main-address'>
          <div styleName='main-address-account'>
            <div styleName='main-address-header-text'>
              <Translate value={`${prefix}.mainAddress`} />
            </div>
            <div styleName='main-address-account-name'>
              <span styleName='main-address-account-name-text'>
                {this.props.account}
              </span>
            </div>
          </div>
          {/* <div styleName='main-address-icons'>
            <div styleName='address-qr-code'>
              <QRIcon iconStyle='average' value={this.props.account} />
            </div>
            <div styleName='address-copy-icon'>
              <CopyIcon iconStyle='average' value={this.props.account} />
            </div>
            <div styleName='address-pk-icon'>
              <PKIcon iconStyle='average' blockchain='Ethereum' />
            </div>
          </div> */}
        </div>

        {this.props.tokens
          .map((token) => {
            return (
              <div styleName='address' key={token.blockchain}>
                <div styleName='address-info'>
                  <div styleName='address-token'>
                    <IPFSImage
                      styleName='address-token-icon'
                      fallback={TOKEN_ICONS[token.symbol]}
                    />
                  </div>
                  <div styleName='address-token-info'>
                    <div styleName='address-info-text'>{token.title} Address</div>
                    <div styleName='address-token-name'>
                      <span styleName='address-token-name-text'>
                        {token.address}
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div styleName='address-icons'>
                  <div styleName='address-qr-code'>
                    {token.address && <QRIcon iconStyle='average' value={token.address} />}
                  </div>
                  <div styleName='address-copy-icon'>
                    <CopyIcon iconStyle='average' value={token.address} />
                  </div>
                  <div styleName='address-pk-icon'>
                    <PKIcon iconStyle='average' blockchain={token.blockchain} />
                  </div>
                </div> */}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ProfileContent
