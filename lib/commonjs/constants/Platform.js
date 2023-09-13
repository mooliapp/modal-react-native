"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIOS = exports.isAndroid = exports.PLAYSTORE_REGEX = void 0;
var _reactNative = require("react-native");
const isAndroid = _reactNative.Platform.OS === 'android';
exports.isAndroid = isAndroid;
const isIOS = _reactNative.Platform.OS === 'ios';
exports.isIOS = isIOS;
const PLAYSTORE_REGEX = /^https?:\/\/(www\.)?play\.google\.com\/store\/apps\/details\?id=[\w\.]+(&[\w-]+(=[\w%-]*)?)*/;
exports.PLAYSTORE_REGEX = PLAYSTORE_REGEX;
//# sourceMappingURL=Platform.js.map