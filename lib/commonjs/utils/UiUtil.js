"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiUtil = void 0;
var _reactNative = require("react-native");
const UiUtil = {
  layoutAnimation() {
    return _reactNative.LayoutAnimation.configureNext(_reactNative.LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
  },
  getWalletName(name) {
    let short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return short ? name.split(' ')[0] : name;
  }
};
exports.UiUtil = UiUtil;
//# sourceMappingURL=UiUtil.js.map