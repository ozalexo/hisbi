import { createSelector } from 'reselect'

export const selectAuthDuck = (state) => state.auth

export const selectAuthType = createSelector(
  selectAuthDuck,
  (auth) => auth.currentAuthType
)

export const selectIsLoggedIn = () => createSelector(
  selectAuthDuck,
  (auth) => auth.isLoggedIn
)
