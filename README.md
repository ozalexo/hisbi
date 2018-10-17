
## Table of Contents

HISBI - How It Should Be Implemented

### Project structure

* patches - contains patch for redux-axios-middleware
  This patch provide this package with ability to obtain appropriate middleware node from store for all Bitcoin-like blockchains (BTC, LTC, NEM, DASH in the future) by special action with the following structure:
  ```
  {
    type: 'REQ/BITCOIN/REQUEST....',
    blockchain: 'Bitcoin',
    payload: { ... }
  }
  ```
  If no `blockchain` property, then client must be specified manually.

* Blockchains-related workspaces:
  * packages/ethereum
  * packages/bitcoin
  * packages/bitcoincash
  * packages/litecoin
  * packages/nem
  * packages/waves
  * packages/ethereum

* Hardware keys support:
  * packages/trezor
  * packages/ledger

* Networking (web3, http api, websockets):
  * packages/nodes

* Create account and login:
  * packages/auth

* Market (CryptoCompare):
  * packages/market

* Common things:
  * packages/core

* src/index.js - main entry file
* src/store - configre/create store, combine all reducers, persist, middlewares' initializations.

* /config - WebPack's config and valid self-signed keys for https://localhost:3000
  Also works with WEbPack development server with no `[WDS] Disconnected` error

### App start
```
yarn
yarn start
```
Development mode only. No production mode.


### To do

* To modify persis configs (outbound) to persist only derived and hardware wallets.
* To implement universal (dynamic reducers?) API for methods getAssress/signTransaction etc. Idea is to set approptiate actions right after login only once based on selected account's type: if 'Memory' methods from packages/%blockchain_name% will be used, if 'Ledger' or 'Trezor'  - hardware wallets will be used via appropriate middleware
* To implement hardware wallets detection: e.g. Trezor account must be not selectable by user if no USB device attached.
* To implement save/load of user profile (HTTPS call appropriate backend and keep some not persist data in redux store)
* To implement WS connection and subscription manager for RabbitMQ server (as it was done in packages/market/middleware). To use socket.io-client instead of SockJS (need to control reconnect and resubscribe)
