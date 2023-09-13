"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _WalletIcon = _interopRequireDefault(require("../assets/WalletIcon"));
var _Image = _interopRequireDefault(require("./Image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sizeMap = {
  xs: 23,
  sm: 30,
  md: 60,
  lg: 90
};
function WalletImage(_ref) {
  let {
    url,
    size,
    style
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const sizeNum = sizeMap[size];
  return url ? /*#__PURE__*/React.createElement(_Image.default, {
    style: [styles.icon, {
      borderColor: Theme.overlayThin,
      height: sizeNum,
      width: sizeNum,
      borderRadius: sizeNum / 3.5
    }, style],
    source: url
  }) : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.icon, styles.placeholderIcon, {
      backgroundColor: Theme.background2,
      borderColor: Theme.overlayThin,
      height: sizeNum,
      width: sizeNum,
      borderRadius: sizeNum / 3.5
    }, style]
  }, /*#__PURE__*/React.createElement(_WalletIcon.default, {
    height: sizeNum / 2,
    width: sizeNum / 2
  }));
}
const styles = _reactNative.StyleSheet.create({
  icon: {
    borderWidth: 1
  },
  placeholderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1
  }
});
var _default = WalletImage;
exports.default = _default;
//# sourceMappingURL=WalletImage.js.map