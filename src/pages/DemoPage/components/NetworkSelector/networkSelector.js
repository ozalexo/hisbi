import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class NetworkSelector extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Networks</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="mainChrono" control={<Radio />} label="Chronobank mainnet" />
            <FormControlLabel value="mainInfura" control={<Radio />} label="Infura mainnet" />
            <FormControlLabel value="testChrono" control={<Radio />} label="Chronobank testnet" />
            <FormControlLabel value="testInfura" control={<Radio />} label="Infura tesnet" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="(Custom ETH node)"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

NetworkSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NetworkSelector);
