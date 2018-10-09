import { createSelector } from 'reselect'
import { DUCK_SIDES } from './constants'

export const selectDuckSides = (state) => state[DUCK_SIDES]

export const selectSidesMainMenuIsOpen = createSelector(
  selectDuckSides,
  (sides) => sides.mainMenuIsOpen
)

export const selectSidesStackLength = createSelector(
  selectDuckSides,
  (sides) => sides.stack.length
)

