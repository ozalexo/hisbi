/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// INFO: See API at https://min-api.cryptocompare.com/

// eslint-disable-next-line import/prefer-default-export
export const requestPrices = (tokens, currencies) => (dispatch) => {
  const action = {
    type: 'REQ/GET/CRYPTOCOMPARE/PRICES',
    payload: {
      client: 'cryptocompare',
      request: {
        method: 'GET',
        url: `/data/pricemulti?fsyms=${tokens}&tsyms=${currencies}`,
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}
