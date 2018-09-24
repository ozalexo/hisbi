import { createSelector } from 'reselect'

export const selectAccountList = createSelector(
  (state) => state.accounts,
  (accounts) => accounts.list
)

export const selectAccountSelected = () => createSelector(
  (state) => state.accounts,
  (accounts) => accounts.selected
)
