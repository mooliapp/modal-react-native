"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WALLET_WIDTH = exports.WALLET_MARGIN = exports.WALLET_HEIGHT = exports.WALLET_FULL_HEIGHT = void 0;
var _reactNative = require("react-native");
var _ExplorerUtil = require("../utils/ExplorerUtil");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ExplorerCtrl = require("../controllers/ExplorerCtrl");
var _RouterCtrl = require("../controllers/RouterCtrl");
var _DataUtil = require("../utils/DataUtil");
var _UiUtil = require("../utils/UiUtil");
var _Touchable = _interopRequireDefault(require("./Touchable"));
var _WalletImage = _interopRequireDefault(require("./WalletImage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const WALLET_MARGIN = 8;
exports.WALLET_MARGIN = WALLET_MARGIN;
const WALLET_WIDTH = 80;
exports.WALLET_WIDTH = WALLET_WIDTH;
const WALLET_HEIGHT = 98;
exports.WALLET_HEIGHT = WALLET_HEIGHT;
const WALLET_FULL_HEIGHT = WALLET_HEIGHT + WALLET_MARGIN * 2;
exports.WALLET_FULL_HEIGHT = WALLET_FULL_HEIGHT;
function WalletItem(_ref) {
  let {
    currentWCURI,
    walletInfo,
    style,
    isRecent
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const imageUrl = _ExplorerCtrl.ExplorerCtrl.getWalletImageUrl(walletInfo.image_id);
  const onPress = () => {
    if (currentWCURI) {
      _DataUtil.DataUtil.setRecentWallet(walletInfo);
      _ExplorerUtil.ExplorerUtil.navigateDeepLink(walletInfo.mobile.universal, walletInfo.mobile.native, currentWCURI);
      _RouterCtrl.RouterCtrl.push('Connecting', {
        wallet: walletInfo
      });
    }
  };
  return /*#__PURE__*/React.createElement(_Touchable.default, {
    onPress: onPress,
    key: walletInfo.id,
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(_WalletImage.default, {
    size: "md",
    url: imageUrl
  }), /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.name, {
      color: Theme.foreground1
    }],
    numberOfLines: 1
  }, _UiUtil.UiUtil.getWalletName(walletInfo.name, true)), (isRecent || walletInfo.isInstalled) && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.status, {
      color: Theme.foreground3
    }]
  }, isRecent ? 'RECENT' : 'INSTALLED'));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    width: WALLET_WIDTH,
    height: WALLET_HEIGHT,
    alignItems: 'center',
    marginVertical: WALLET_MARGIN
  },
  name: {
    marginTop: 5,
    maxWidth: 100,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2
  },
  status: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center'
  }
});
var _default = WalletItem;
exports.default = _default;
//# sourceMappingURL=WalletItem.js.map