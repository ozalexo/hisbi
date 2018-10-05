/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Fragment, PureComponent } from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
// import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
// import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

// const renderTextField = ({
//   input,
//   label,
//   meta: { touched, error },
//   ...custom
// }) => (
//   <TextField
//     errorText={touched && error}
//     inputProps={{ fullWidth: true }}
//     {...input}
//     {...custom}
//   />
// )

class EnterMnemonicForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render () {
    const {handleSubmit, onSubmit, classes} = this.props
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fragment>
          <Field
            name='EnterMnemonicForm'
            component={
              <Input
                fullWidth
                placeholder='Enter mnemonic'
                className={classes.input}
                inputProps={{
                  'aria-label': 'Enter mnemonic phrase',
                }}
              />
            }
            label='Enter mnemonic'
          />
        </Fragment>
      </form>
    )
  }
}
// export const EnterMnemonicForm = ({ handleSubmit, onSubmit }) => {
// // export const EnterMnemonicForm = (props) => {
//   // console.log(props)
//   return withStyles({})(
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Fragment>
//         <Field
//           name='EnterMnemonicForm'
//           component={
//             <Input
//               fullWidth
//               placeholder='Enter mnemonic'
//               className={this.props.classes.input}
//               inputProps={{
//                 'aria-label': 'Enter mnemonic phrase',
//               }}
//             />
//           }
//           label='Enter mnemonic'
//         />
//       </Fragment>
//     </form>
//   )
// }

export default withStyles(() => {})(EnterMnemonicForm)
// export default EnterMnemonicForm
