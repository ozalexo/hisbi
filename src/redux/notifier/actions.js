/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  NOTIFIER_CLOSE,
  NOTIFIER_MESSAGE,
} from './constants'

export const notify = (notice, isStorable = true) => ({
  type: NOTIFIER_MESSAGE,
  notice,
  isStorable,
})

export const closeNotifier = () => ({
  type: NOTIFIER_CLOSE,
})

