"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSessionParams = void 0;
const DEFAULT_CHAINS = ['eip155:1'];
const REQUIRED_METHODS = ['eth_sendTransaction', 'personal_sign'];
const REQUIRED_EVENTS = ['chainChanged', 'accountsChanged'];
const defaultSessionParams = {
  namespaces: {
    eip155: {
      methods: REQUIRED_METHODS,
      chains: DEFAULT_CHAINS,
      events: REQUIRED_EVENTS,
      rpcMap: {}
    }
  }
};
exports.defaultSessionParams = defaultSessionParams;
//# sourceMappingURL=Config.js.map