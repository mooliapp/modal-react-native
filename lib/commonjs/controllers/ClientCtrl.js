"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientCtrl = void 0;
var _valtio = require("valtio");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  initialized: false,
  provider: undefined,
  session: undefined
});

// -- controller -------------------------------------------------- //
const ClientCtrl = {
  state,
  setProvider(provider) {
    if (!state.initialized && provider) {
      state.provider = (0, _valtio.ref)(provider);
    }
  },
  setInitialized(initialized) {
    state.initialized = initialized;
  },
  setSession(session) {
    if (session && state.provider) {
      state.session = session;
    }
  },
  provider() {
    return state.provider;
  },
  session() {
    return state.session;
  },
  resetSession() {
    state.session = undefined;
  }
};
exports.ClientCtrl = ClientCtrl;
//# sourceMappingURL=ClientCtrl.js.map