/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { chunker } from './utils'
import * as MarketMiddlewareActions from './actions'
import { selectMarketRates, selectLastMarket, selectMarketTokens, selectMarketCurrencies } from '../redux/selectors'
import { requestPrices } from '@chronobank/nodes/api/otherHosts/cryptocompare'


// TODO: [AO] need to clarify this algorythm
// From my point of view, it's wrong to update lastMarket and rates separately
export const updateMarket = (updateData) => (
  dispatch,
  getState,
) => {
  if (!updateData) {
    return
  }

  let state = getState()
  const symbol = updateData.symbol
  let newMarketData = Object.assign({}, updateData)

  // update last market for a pare
  if (newMarketData.LASTMARKET) {
    dispatch(MarketMiddlewareActions.marketLastUpdate(symbol, newMarketData.LASTMARKET))
  } else {
    newMarketData.LASTMARKET = selectLastMarket(state)[ symbol ]
  }

  state = getState()
  const lastMarket = newMarketData.LASTMARKET || selectLastMarket(state)
  const rates = selectMarketRates(state)
  newMarketData = {
    ...(rates[symbol] && rates[symbol][lastMarket] || undefined),
    ...newMarketData,
  }

  const price = newMarketData.PRICE
  const open24hour = newMarketData.OPEN24HOUR

  if (price && open24hour) {
    newMarketData.CHANGE24H = price - open24hour
    newMarketData.CHANGEPCT24H = newMarketData.CHANGE24H / open24hour * 100
  }

  if (!newMarketData.LASTMARKET) {
    console.log('newMarketData', newMarketData)
  }
  dispatch(MarketMiddlewareActions.updateMarketRates(newMarketData))
}

const MAX_FSYMS_LENGTH = 300 // Max length of a string of comma-spearated tokens. See API at https://min-api.cryptocompare.com/
export const requestMarketPrices = () => async (dispatch, getState) => {
  const state = getState()
  const tokens = selectMarketTokens(state)
  const currencies = selectMarketCurrencies(state)
  const tokenList = tokens.join(',')
  const currencyList = currencies.join(',')

  const prices = {}
  if (tokenList.length > MAX_FSYMS_LENGTH) {
    const chunks = chunker(tokens)
    const chunkedResponse = await Promise.all(
      chunks.map((tokensChunk) => dispatch(requestPrices(tokensChunk.join(','), currencyList))
        // .then((responseChunk) => responseChunk)
        .then((responseChunk) => {
          console.log('Chunk:', responseChunk)
          return responseChunk
        })
        .catch((error) => { console.log('HTTP response ERROR:', error) })
      )
    )

    prices['data'] = {}
    chunkedResponse.forEach((cResponse) => prices.data = { ...prices.data, ...cResponse.data })
  } else {
    dispatch(requestPrices(tokenList, currencyList))
      .then((response) => prices.data = response.data)
      .catch((error) => { console.log('HTTP response ERROR:', error) })
  }

  console.log('prices:', prices)
  if (prices.data && Object.keys(prices.data).length > 0) {
    dispatch(MarketMiddlewareActions.updateMarketPrices(prices.data))
  }
}

