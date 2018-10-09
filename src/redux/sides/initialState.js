/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  MENU_ASSETS_MANAGER_PANEL_KEY,
  NOTIFICATION_PANEL_KEY,
  PROFILE_SIDE_PANEL_KEY,
} from './constants'

export default {
  isProfilePanelOpen: false,
  mainMenuIsOpen: false,
  stack: {
    [PROFILE_SIDE_PANEL_KEY]: {
      componentName: 'ProfileContent',
      panelKey: PROFILE_SIDE_PANEL_KEY,
      isOpened: false,
      direction: 'right',
      drawerProps: {
        width: 300,
      },
    },
    [NOTIFICATION_PANEL_KEY]: {
      componentName: 'NotificationContent',
      panelKey: NOTIFICATION_PANEL_KEY,
      isOpened: false,
      anchor: 'right',
    },
    [MENU_ASSETS_MANAGER_PANEL_KEY]: {
      componentName: 'MenuAssetsManagerMoreInfo',
      panelKey: MENU_ASSETS_MANAGER_PANEL_KEY,
      isOpened: false,
      anchor: 'left',
    },
  },
}
