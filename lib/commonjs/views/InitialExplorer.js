"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _WalletItem = _interopRequireWildcard(require("../components/WalletItem"));
var _ViewAllBox = _interopRequireDefault(require("../components/ViewAllBox"));
var _QRCode = _interopRequireDefault(require("../assets/QRCode"));
var _ModalHeader = _interopRequireDefault(require("../components/ModalHeader"));
var _RouterCtrl = require("../controllers/RouterCtrl");
var _OptionsCtrl = require("../controllers/OptionsCtrl");
var _WcConnectionCtrl = require("../controllers/WcConnectionCtrl");
var _ConfigCtrl = require("../controllers/ConfigCtrl");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _DataUtil = require("../utils/DataUtil");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function InitialExplorer(_ref) {
  let {
    isPortrait
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const {
    isDataLoaded
  } = (0, _valtio.useSnapshot)(_OptionsCtrl.OptionsCtrl.state);
  const {
    pairingUri
  } = (0, _valtio.useSnapshot)(_WcConnectionCtrl.WcConnectionCtrl.state);
  const {
    explorerExcludedWalletIds
  } = (0, _valtio.useSnapshot)(_ConfigCtrl.ConfigCtrl.state);
  const wallets = _DataUtil.DataUtil.getInitialWallets();
  const recentWallet = _DataUtil.DataUtil.getRecentWallet();
  const loading = !isDataLoaded || !pairingUri;
  const viewHeight = isPortrait ? _WalletItem.WALLET_FULL_HEIGHT * 2 : _WalletItem.WALLET_FULL_HEIGHT;
  const showViewAllButton = wallets.length > 8 || explorerExcludedWalletIds !== 'ALL';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ModalHeader.default, {
    title: "Connect your wallet",
    onActionPress: () => _RouterCtrl.RouterCtrl.push('Qrcode'),
    actionIcon: /*#__PURE__*/React.createElement(_QRCode.default, {
      width: 22,
      height: 22,
      fill: Theme.accent
    })
  }), loading ? /*#__PURE__*/React.createElement(_reactNative.ActivityIndicator, {
    style: {
      height: viewHeight
    },
    color: Theme.accent
  }) : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.explorerContainer, {
      height: viewHeight,
      backgroundColor: Theme.background1
    }]
  }, wallets.slice(0, showViewAllButton ? 7 : 8).map(item => /*#__PURE__*/React.createElement(_WalletItem.default, {
    walletInfo: item,
    key: item.id,
    isRecent: item.id === (recentWallet === null || recentWallet === void 0 ? void 0 : recentWallet.id),
    currentWCURI: pairingUri,
    style: isPortrait ? styles.portraitItem : styles.landscapeItem
  })), showViewAllButton && /*#__PURE__*/React.createElement(_ViewAllBox.default, {
    onPress: () => _RouterCtrl.RouterCtrl.push('WalletExplorer'),
    wallets: wallets.slice(-4),
    style: isPortrait ? styles.portraitItem : styles.landscapeItem
  })));
}
const styles = _reactNative.StyleSheet.create({
  explorerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  portraitItem: {
    width: '25%'
  },
  landscapeItem: {
    width: '12.5%'
  }
});
var _default = InitialExplorer;
exports.default = _default;
//# sourceMappingURL=InitialExplorer.js.map