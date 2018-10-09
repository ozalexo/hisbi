/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import ErrorList from '../../utils/ErrorList'

const emailValidator = (value, required = true) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if ((!value && required) || (value && !re.test(value))) {
    return 'errors.invalidEmail'
  }
  return null
}

const required = (value) => !value ? 'errors.required' : null

export default (values) => {
  const email = values.email
  const emailErrors = new ErrorList()
  emailErrors.add(required(email))
  emailErrors.add(emailValidator(email))

  return {
    email: emailErrors.getErrors(),
  }
}
