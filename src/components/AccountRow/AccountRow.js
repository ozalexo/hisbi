/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import actionIcon from '../../assets/img/icons/list.svg'

import './AccountRow.scss'

export default class AccountRow extends React.Component {
  static propTypes = {
    actionIcon: PropTypes.string,
    avatar: PropTypes.string,
    hideActionIcon: PropTypes.bool,
    linkTitle: PropTypes.string,
    onClick: PropTypes.func,
    reverseIcon: PropTypes.bool,
    subtitle: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    actionIcon: actionIcon,
    avatar: '',
    hideActionIcon: false,
    linkTitle: '',
    onClick: null,
    reverseIcon: false,
  }

  renderAvatar (){
    const { avatar } = this.props

    if (!avatar){
      return (
        <div styleName='default-avatar-wrapper'>
          <span styleName='default-avatar' className='chronobank-icon'>
            profile-circle
          </span>
        </div>
      )
    }

    return (
      <img styleName='userAvatar' src={avatar} alt='' />
    )
  }

  renderTitle = () => {
    const { title } = this.props

    if (!title) {
      return null
    }

    return (
      <div styleName={classnames('title')}>
        {
          title
        }
      </div>
    )
  }

  renderSubtitle = () => {
    const { subtitle } = this.props

    if (!subtitle) {
      return null
    }

    return (
      <div styleName={classnames('subtitle')}>
        {
          subtitle
        }
      </div>
    )
  }

  renderAction = (isClickable) => {
    const {
      actionIcon,
      linkTitle,
      reverseIcon,
    } = this.props
    if (this.props.hideActionIcon) {
      return null
    }

    return (
      <div styleName={classnames('actionWrapper')}>
        <div
          styleName={classnames('actionListTrigger', isClickable ? '' : 'actionListTriggerDisabled')}
          onClick={this.handleClick}
          title={linkTitle}
        >
          <img styleName={classnames(reverseIcon ? 'reverseIcon' : '')} src={actionIcon} alt='' />
        </div>
      </div>
    )
  }

  handleClick = (selectedAvatar) => {
    if (this.props.onClick) {
      this.props.onClick(selectedAvatar)
    }
  }

  render () {

    const isClickable = this.props.onClick
      ? true
      : false

    const userBlockStyles = classnames('userBlock', isClickable ? '' : 'userBlockSingle')

    return (
      <div
        styleName={userBlockStyles}
        onClick={this.handleClick}
      >
        <div styleName={classnames('userBlockInner')}>
          <div styleName={classnames('userBlockAvatar')}>
            {
              this.renderAvatar()
            }
          </div>
          <div styleName={classnames('userBlockInfo')}>
            {
              this.renderTitle()
            }
            {
              this.renderSubtitle()
            }
          </div>
        </div>
        {
          this.renderAction(isClickable)
        }
      </div>
    )
  }
}
