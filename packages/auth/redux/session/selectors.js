import { createSelector } from 'reselect'

export const selectSessionDuck = (state) => state.session

export const selectSessionType = createSelector(
  selectSessionDuck,
  (session) => session.currentAuthType
)

export const selectIsLoggedIn = () => createSelector(
  selectSessionDuck,
  (session) => session.isLoggedIn
)

