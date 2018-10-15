/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
// import * as ActionTypes from './constants'
import middlewareMutations from '../middleware/reducers'


const mutations = {

}

export default (state = initialState, { type, ...payload }) => {
  const marketMutations = {
    ...middlewareMutations,
    ...mutations,
  }
  return (type in marketMutations)
    ? marketMutations[type](state, payload)
    : state
}
