/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// import { I18n, loadTranslations, setLocale } from 'react-redux-i18n'
import { nodesInit } from '@chronobank/nodes/redux/nodes/actions'
import { preselectNetwork } from '@chronobank/nodes/redux/nodes/thunks'
// import { middlewareConnect } from '@chronobank/nodes/middleware/thunks'
// import { WebSocketService } from '@chronobank/core/services/WebSocketService'
// import moment from 'moment'
// import { loadI18n } from '../redux/i18n/thunks'
// import translations from '../i18n'

export const initPrimaryNodes = async (store) => {
  store.dispatch(preselectNetwork()) // Automatic selection of a primary node and network (mainnet/testnet)
  await store.dispatch(nodesInit()) // Init Nodes middlware (working with Ehtereum primary nodes via web3)
  // TODO: WebSocketService we be removed. Let's it be here for now
  // WebSocketService.initWebSocketService(store)
}

// export const initI18N = async (store) => {
//   // Locale init
//   const state = store.getState()
//   I18n.setTranslationsGetter(() => state.i18n.translations)
//   I18n.setLocaleGetter(() => state.i18n.locale)

//   // const locale = localStorage.getLocale()
//   const { locale } = state.accounts.locale
//   // set moment locale
//   moment.locale(locale)

//   store.dispatch(loadTranslations(translations))
//   store.dispatch(setLocale(locale))

//   // load i18n from the public site
//   await store.dispatch(loadI18n(locale))
// }

// export const initChronobankMiddlewares = async (store) => {
//   // // dispatch(preselectNetwork()) // Automatic selection of a primary node and network (mainnet/testnet)
//   store.dispatch(nodesInit()) // Init Nodes middlware (working with Ehtereum primary nodes via web3)
//   store.dispatch(middlewareConnect())
//   // // TODO: WebSocketService we be removed. Let's it be here for now
//   // WebSocketService.initWebSocketService(store)
// }
