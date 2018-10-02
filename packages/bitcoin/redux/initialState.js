import { COIN_TYPE_BTC_MAINNET, COIN_TYPE_BTC_TESTNET} from '../constants'

export default {
  derivedPath: {
    mainnet: `m/44'/${COIN_TYPE_BTC_MAINNET}'/0'/0/0`,
    testnet: `m/44'/${COIN_TYPE_BTC_TESTNET}'/0'/0/0`,
  },
  enabled: true,
  tokens: {},
  wallets: {},
}
