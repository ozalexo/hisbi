/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { selectNodesState } from '@chronobank/nodes/redux/nodes/selectors'
import compose from 'recompose/compose'
import { networkSwitch } from '@chronobank/nodes/redux/nodes/actions'

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

const mapStateToProps = (state) => ({
  networks: selectNodesState(state),
})

const mapDispatchToProps = (dispatch) => ({
  networkSwitch: (networkIndex) => dispatch(networkSwitch(networkIndex)),
})

class NetworkSelector extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    networkSwitch: PropTypes.func,
  }

  handleChange = (event) => {
    this.props.networkSwitch(parseInt(event.target.value))
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Networks</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.props.networks.selected.networkIndex.toString()}
            onChange={this.handleChange}
          >
            {
              this.props.networks.availableNetworks.map((network) => {
                const value = network.networkIndex.toString()
                const label = network.networkTitle
                return (
                  <FormControlLabel
                    key={label}
                    value={value}
                    control={<Radio />}
                    label={label}
                  />
                )
              })
            }
            {/* <FormControlLabel value="mainChrono" checked={true} control={<Radio />} label="Chronobank mainnet" />
            <FormControlLabel value="mainInfura" control={<Radio />} label="Infura mainnet" />
            <FormControlLabel value="testChrono" control={<Radio />} label="Chronobank testnet" />
            <FormControlLabel value="testInfura" control={<Radio />} label="Infura tesnet" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="(Custom ETH node)"
            /> */}
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(NetworkSelector)
