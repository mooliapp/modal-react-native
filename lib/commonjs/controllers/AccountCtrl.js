"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountCtrl = void 0;
var _valtio = require("valtio");
var _ClientCtrl = require("./ClientCtrl");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  address: undefined,
  isConnected: false
});

// -- controller --------------------------------------------------- //
const AccountCtrl = {
  state,
  async getAccount() {
    const provider = _ClientCtrl.ClientCtrl.state.provider;
    const accounts = await (provider === null || provider === void 0 ? void 0 : provider.request({
      method: 'eth_accounts'
    }));
    if (accounts) {
      state.address = accounts[0];
      state.isConnected = true;
    }
  },
  setAddress(address) {
    state.address = address;
  },
  setIsConnected(isConnected) {
    state.isConnected = isConnected;
  },
  resetAccount() {
    state.address = undefined;
    state.isConnected = false;
  }
};
exports.AccountCtrl = AccountCtrl;
//# sourceMappingURL=AccountCtrl.js.map