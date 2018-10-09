import { createSelector } from 'reselect'
import { DUCK_NOTIFIER } from './constants'

export const selectDuckNotifier = (state) => state[DUCK_NOTIFIER]

export const selectNotifierNotice = createSelector(
  selectDuckNotifier,
  (notifier) => notifier.notice
)

