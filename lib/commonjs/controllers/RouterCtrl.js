"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterCtrl = void 0;
var _valtio = require("valtio");
var _UiUtil = require("../utils/UiUtil");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  history: ['ConnectWallet'],
  view: 'ConnectWallet',
  data: undefined
});

// -- controller --------------------------------------------------- //
const RouterCtrl = {
  state,
  push(view, data) {
    if (view !== state.view) {
      _UiUtil.UiUtil.layoutAnimation();
      state.view = view;
      if (data) {
        state.data = data;
      }
      state.history.push(view);
    }
  },
  replace(view) {
    state.view = view;
    state.history = [view];
  },
  goBack() {
    if (state.history.length > 1) {
      _UiUtil.UiUtil.layoutAnimation();
      state.history.pop();
      const [last] = state.history.slice(-1);
      state.view = last || 'ConnectWallet';
    }
  }
};
exports.RouterCtrl = RouterCtrl;
//# sourceMappingURL=RouterCtrl.js.map