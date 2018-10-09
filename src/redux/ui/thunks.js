import { userLogout } from '@chronobank/auth/redux/session/thunks'
import { navigateToRoot } from '../../redux/navigation'

// eslint-disable-next-line import/prefer-default-export
export const logoutAndNavigateToRoot = (dispatch) => {
  dispatch(userLogout())
  dispatch(navigateToRoot())
}
