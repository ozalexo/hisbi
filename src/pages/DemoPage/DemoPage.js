/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import InboxIcon from '@material-ui/icons/MoveToInbox'
// import DraftsIcon from '@material-ui/icons/Drafts'
// import StarIcon from '@material-ui/icons/Star'
// import SendIcon from '@material-ui/icons/Send'
// import MailIcon from '@material-ui/icons/Mail'
// import DeleteIcon from '@material-ui/icons/Delete'
// import ReportIcon from '@material-ui/icons/Report'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'
import NetworkSelector from './components/NetworkSelector'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
import EnterMnemonicFormContainer from '../../containers/EnterMnemonicFormContainer'

const drawerWidth = 240

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
})

class DemoPage extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              ChronoWallet Network Demo: HTTP nodes, web-sockets and web3
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <NetworkSelector />
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <EnterMnemonicFormContainer />
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(DemoPage)
