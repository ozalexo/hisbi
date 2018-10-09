/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import BCC from './img/icn-bitcoin-cash.svg'
import BTC from './img/icn-bitcoin.svg'
import DASH from './img/dash.svg'
import DEFAULT from './img/asset_stub.svg'
import ETH from './img/icn-ethereum.svg'
import LHAU from './img/icn-lhau.svg'
import LHEU from './img/icn-lheu.svg'
import LHUS from './img/icn-lhus.svg'
import LTC from './img/icn-litecoin.svg'
import TIME from './img/icn-time.svg'
import WAVES from './img/waves.svg'
import XEM from './img/icn-xem.svg'
import XMIN from './img/icn-xmin.svg'

import r0 from './img/r-0.svg'
import r1 from './img/r-25.svg'
import r2 from './img/r-50.svg'
import r3 from './img/r-75.svg'
import r4 from './img/r-100.svg'
import s0 from './img/s-0.svg'
import s1 from './img/s-25.svg'
import s2 from './img/s-50.svg'
import s3 from './img/s-75.svg'
import s4 from './img/s-100.svg'

export SPINNING_WHEEL from './img/spinningwheel-1.gif'

export const TOKEN_ICONS = {
  BCC,
  BTC,
  DASH,
  DEFAULT,
  ETH,
  LHAU,
  LHEU,
  LHUS,
  LTC,
  TIME,
  WAVES,
  XEM,
  XMIN,
}

export const TX_CONFIRMATIONS = {
  [ 'r_0' ]: r0,
  [ 'r_1' ]: r1,
  [ 'r_2' ]: r2,
  [ 'r_3' ]: r3,
  [ 'r_4' ]: r4,
  [ 's_0' ]: s0,
  [ 's_1' ]: s1,
  [ 's_2' ]: s2,
  [ 's_3' ]: s3,
  [ 's_4' ]: s4,
}

export default {
  TOKEN_ICONS,
  TX_CONFIRMATIONS,
}
