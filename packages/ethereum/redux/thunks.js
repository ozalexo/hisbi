/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Web3ListenerActions from '../middleware/actions'
import * as EthActions from './actions'

// eslint-disable-next-line import/prefer-default-export
export const initWeb3Listener = () => (
  dispatch,
  // getState
) => {
  dispatch(Web3ListenerActions.initWeb3Listener())
    .then(() => {
      dispatch(Web3ListenerActions.initWeb3ListenerSuccess())
    })
    .catch((error) => {
      dispatch(Web3ListenerActions.initWeb3ListenerFailed(error))
      throw new Error(error)
    })
}

export const appendToken = (token) => (dispatch/*, getState*/) => {
  dispatch(EthActions.AppendTokenToList(token))
}
