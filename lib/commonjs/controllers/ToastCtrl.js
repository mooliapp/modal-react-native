"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastCtrl = void 0;
var _valtio = require("valtio");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  open: false,
  message: '',
  variant: 'success'
});

// -- controller --------------------------------------------------- //
const ToastCtrl = {
  state,
  openToast(message, variant) {
    state.open = true;
    state.message = message;
    state.variant = variant;
  },
  closeToast() {
    state.open = false;
  }
};
exports.ToastCtrl = ToastCtrl;
//# sourceMappingURL=ToastCtrl.js.map