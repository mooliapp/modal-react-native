"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeCtrl = void 0;
var _reactNative = require("react-native");
var _valtio = require("valtio");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  themeMode: _reactNative.Appearance.getColorScheme() ?? 'light',
  accentColor: undefined
});

// -- controller --------------------------------------------------- //
const ThemeCtrl = {
  state,
  setThemeMode(themeMode) {
    state.themeMode = themeMode ?? _reactNative.Appearance.getColorScheme() ?? 'light';
  },
  setAccentColor(accentColor) {
    state.accentColor = accentColor;
  }
};
exports.ThemeCtrl = ThemeCtrl;
//# sourceMappingURL=ThemeCtrl.js.map