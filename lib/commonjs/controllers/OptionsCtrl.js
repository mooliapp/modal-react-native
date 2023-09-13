"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsCtrl = void 0;
var _valtio = require("valtio");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  isDataLoaded: false
});

// -- controller --------------------------------------------------- //
const OptionsCtrl = {
  state,
  setIsDataLoaded(isDataLoaded) {
    state.isDataLoaded = isDataLoaded;
  }
};
exports.OptionsCtrl = OptionsCtrl;
//# sourceMappingURL=OptionsCtrl.js.map