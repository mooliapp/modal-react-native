"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _WalletItem = _interopRequireWildcard(require("../components/WalletItem"));
var _ModalHeader = _interopRequireDefault(require("../components/ModalHeader"));
var _ExplorerCtrl = require("../controllers/ExplorerCtrl");
var _OptionsCtrl = require("../controllers/OptionsCtrl");
var _WcConnectionCtrl = require("../controllers/WcConnectionCtrl");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ThemeCtrl = require("../controllers/ThemeCtrl");
var _SearchBar = _interopRequireDefault(require("../components/SearchBar"));
var _DataUtil = require("../utils/DataUtil");
var _Text = _interopRequireDefault(require("../components/Text"));
var _useDebounceCallback = require("../hooks/useDebounceCallback");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ViewAllExplorer(_ref) {
  let {
    isPortrait,
    windowHeight,
    windowWidth
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const {
    isDataLoaded
  } = (0, _valtio.useSnapshot)(_OptionsCtrl.OptionsCtrl.state);
  const {
    pairingUri
  } = (0, _valtio.useSnapshot)(_WcConnectionCtrl.WcConnectionCtrl.state);
  const {
    themeMode
  } = (0, _valtio.useSnapshot)(_ThemeCtrl.ThemeCtrl.state);
  const {
    wallets
  } = (0, _valtio.useSnapshot)(_ExplorerCtrl.ExplorerCtrl.state);
  const recentWallet = _DataUtil.DataUtil.getRecentWallet();
  const shouldLoadWallets = wallets.listings.length === 0;
  const [walletsLoading, setWalletsLoading] = (0, _react.useState)(false);
  const loading = !isDataLoaded || !pairingUri || walletsLoading;
  const [search, setSearch] = (0, _react.useState)('');
  const onChangeText = (0, _useDebounceCallback.useDebounceCallback)({
    callback: setSearch
  });
  (0, _react.useEffect)(() => {
    async function getWallets() {
      if (shouldLoadWallets) {
        setWalletsLoading(true);
        await _ExplorerCtrl.ExplorerCtrl.getWallets();
        setWalletsLoading(false);
      }
    }
    getWallets();
  }, [shouldLoadWallets]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ModalHeader.default, {
    shadow: true
  }, /*#__PURE__*/React.createElement(_SearchBar.default, {
    onChangeText: onChangeText,
    style: styles.searchbar
  })), loading ? /*#__PURE__*/React.createElement(_reactNative.ActivityIndicator, {
    style: {
      height: Math.round(windowHeight * 0.6)
    },
    color: Theme.accent
  }) : /*#__PURE__*/React.createElement(_reactNative.FlatList, {
    data: _DataUtil.DataUtil.getAllWallets({
      search
    }),
    style: {
      height: Math.round(windowHeight * 0.6),
      backgroundColor: Theme.background1
    },
    contentContainerStyle: styles.listContentContainer,
    indicatorStyle: themeMode === 'dark' ? 'white' : 'black',
    showsVerticalScrollIndicator: true,
    numColumns: isPortrait ? 4 : 7,
    fadingEdgeLength: 20,
    ListEmptyComponent: /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [styles.emptyContainer, {
        height: Math.round(windowHeight * 0.6)
      }]
    }, /*#__PURE__*/React.createElement(_Text.default, {
      style: [styles.emptyText, {
        color: Theme.foreground2
      }]
    }, "No results found")),
    key: isPortrait ? 'portrait' : 'landscape',
    getItemLayout: (_data, index) => ({
      length: _WalletItem.WALLET_FULL_HEIGHT,
      offset: _WalletItem.WALLET_FULL_HEIGHT * index,
      index
    }),
    renderItem: _ref2 => {
      let {
        item
      } = _ref2;
      return /*#__PURE__*/React.createElement(_WalletItem.default, {
        currentWCURI: pairingUri,
        walletInfo: item,
        isRecent: item.id === (recentWallet === null || recentWallet === void 0 ? void 0 : recentWallet.id),
        style: {
          width: isPortrait ? Math.round(windowWidth / 4) : Math.round(windowWidth / 7)
        }
      });
    }
  }));
}
const styles = _reactNative.StyleSheet.create({
  listContentContainer: {
    paddingBottom: 12
  },
  searchbar: {
    marginLeft: 16
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600'
  }
});
var _default = ViewAllExplorer;
exports.default = _default;
//# sourceMappingURL=ViewAllExplorer.js.map