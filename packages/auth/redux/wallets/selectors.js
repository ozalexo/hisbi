import { createSelector } from 'reselect'

export const selectWalletList = createSelector(
  (state) => state.wallets,
  (wallets) => wallets.list
)

export const selectWalletSelected = () => createSelector(
  (state) => state.wallets,
  (wallets) => wallets.selected
)
