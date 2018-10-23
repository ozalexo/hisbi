/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const addBlockchain = ({
  type: ActionsTypes.CORE_BLOCKCHAIN_ADD,
})

export const removeBlockchain = ({
  type: ActionsTypes.CORE_BLOCKCHAIN_REMOVE,
})

export const enableBlockchain = ({
  type: ActionsTypes.CORE_BLOCKCHAIN_ENABLE,
})

export const disableBlockchain = ({
  type: ActionsTypes.CORE_BLOCKCHAIN_DISABLE,
})
