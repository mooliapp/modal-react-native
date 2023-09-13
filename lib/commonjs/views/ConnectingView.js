"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _ModalHeader = _interopRequireDefault(require("../components/ModalHeader"));
var _CopyLarge = _interopRequireDefault(require("../assets/CopyLarge"));
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ToastCtrl = require("../controllers/ToastCtrl");
var _WcConnectionCtrl = require("../controllers/WcConnectionCtrl");
var _Text = _interopRequireDefault(require("../components/Text"));
var _ExplorerUtil = require("../utils/ExplorerUtil");
var _RouterCtrl = require("../controllers/RouterCtrl");
var _Touchable = _interopRequireDefault(require("../components/Touchable"));
var _UiUtil = require("../utils/UiUtil");
var _Retry = _interopRequireDefault(require("../assets/Retry"));
var _WalletImage = _interopRequireDefault(require("../components/WalletImage"));
var _WalletLoadingThumbnail = _interopRequireDefault(require("../components/WalletLoadingThumbnail"));
var _Chevron = _interopRequireDefault(require("../assets/Chevron"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ConnectingView(_ref) {
  var _data$wallet, _data$wallet2, _data$wallet3, _data$wallet4, _data$wallet5;
  let {
    onCopyClipboard
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const {
    pairingUri,
    pairingError
  } = (0, _valtio.useSnapshot)(_WcConnectionCtrl.WcConnectionCtrl.state);
  const {
    data
  } = (0, _valtio.useSnapshot)(_RouterCtrl.RouterCtrl.state);
  const walletName = _UiUtil.UiUtil.getWalletName((data === null || data === void 0 ? void 0 : (_data$wallet = data.wallet) === null || _data$wallet === void 0 ? void 0 : _data$wallet.name) ?? 'Wallet', true);
  const imageUrl = _ExplorerUtil.ExplorerUtil.getWalletImageUrl(data === null || data === void 0 ? void 0 : (_data$wallet2 = data.wallet) === null || _data$wallet2 === void 0 ? void 0 : _data$wallet2.image_id);
  const alternateLink = data !== null && data !== void 0 && (_data$wallet3 = data.wallet) !== null && _data$wallet3 !== void 0 && _data$wallet3.mobile.native && data.wallet.mobile.universal ? data.wallet.mobile.universal : undefined;
  const storeLink = _reactNative.Platform.select({
    ios: data === null || data === void 0 ? void 0 : (_data$wallet4 = data.wallet) === null || _data$wallet4 === void 0 ? void 0 : _data$wallet4.app.ios,
    android: data === null || data === void 0 ? void 0 : (_data$wallet5 = data.wallet) === null || _data$wallet5 === void 0 ? void 0 : _data$wallet5.app.android
  });
  const storeCaption = _reactNative.Platform.select({
    ios: 'App Store',
    android: 'Play Store'
  });
  const onCopy = async () => {
    if (onCopyClipboard) {
      onCopyClipboard(pairingUri);
      _ToastCtrl.ToastCtrl.openToast('Link copied', 'success');
    }
  };
  const onRetry = () => {
    var _data$wallet6, _data$wallet7;
    _WcConnectionCtrl.WcConnectionCtrl.setPairingError(null);
    _ExplorerUtil.ExplorerUtil.navigateDeepLink(data === null || data === void 0 ? void 0 : (_data$wallet6 = data.wallet) === null || _data$wallet6 === void 0 ? void 0 : _data$wallet6.mobile.universal, data === null || data === void 0 ? void 0 : (_data$wallet7 = data.wallet) === null || _data$wallet7 === void 0 ? void 0 : _data$wallet7.mobile.native, pairingUri);
  };
  const onAlternativePress = () => {
    if (alternateLink) {
      _WcConnectionCtrl.WcConnectionCtrl.setPairingError(null);
      _ExplorerUtil.ExplorerUtil.navigateDeepLink(alternateLink, '', pairingUri);
    }
  };
  (0, _react.useEffect)(() => {
    _WcConnectionCtrl.WcConnectionCtrl.setPairingError(null);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ModalHeader.default, {
    title: walletName,
    actionIcon: /*#__PURE__*/React.createElement(_CopyLarge.default, {
      width: 22,
      height: 22,
      fill: Theme.accent
    }),
    onActionPress: onCopyClipboard ? onCopy : undefined
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.walletContainer, {
      backgroundColor: Theme.background1
    }]
  }, /*#__PURE__*/React.createElement(_WalletLoadingThumbnail.default, {
    showError: !!pairingError
  }, /*#__PURE__*/React.createElement(_WalletImage.default, {
    url: imageUrl,
    size: "lg"
  })), /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.continueText, {
      color: pairingError ? Theme.negative : Theme.foreground1
    }]
  }, pairingError ? 'Connection declined' : `Continue in ${walletName}...`)), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.footer, {
      backgroundColor: Theme.background2
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.upperFooter, {
      borderColor: Theme.foreground3
    }]
  }, /*#__PURE__*/React.createElement(_Touchable.default, {
    style: [styles.retryButton, {
      backgroundColor: Theme.accent
    }],
    onPress: onRetry
  }, /*#__PURE__*/React.createElement(_Text.default, {
    style: styles.text
  }, "Retry"), /*#__PURE__*/React.createElement(_Retry.default, {
    style: styles.retryIcon
  })), alternateLink && /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.text, styles.alternateText, {
      color: Theme.foreground2
    }]
  }, "Still doesn't work?", ' ', /*#__PURE__*/React.createElement(_Text.default, {
    style: {
      color: Theme.accent
    },
    onPress: onAlternativePress
  }, "Try this alternate link"))), storeLink && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.lowerFooter
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(_WalletImage.default, {
    url: imageUrl,
    size: "sm"
  }), /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.getText, {
      color: Theme.foreground1
    }]
  }, `Get ${walletName}`)), /*#__PURE__*/React.createElement(_Touchable.default, {
    style: styles.row,
    onPress: () => _reactNative.Linking.openURL(storeLink)
  }, /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.storeText, {
      color: Theme.foreground2
    }]
  }, storeCaption), /*#__PURE__*/React.createElement(_Chevron.default, {
    fill: Theme.foreground2,
    width: 6,
    style: styles.storeIcon
  })))));
}
const styles = _reactNative.StyleSheet.create({
  walletContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  image: {
    height: 96,
    width: 96,
    borderRadius: 28
  },
  continueText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600'
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  retryIcon: {
    marginLeft: 4
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  alternateText: {
    marginTop: 16
  },
  getText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  storeText: {
    fontSize: 14,
    fontWeight: '600'
  },
  footer: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  upperFooter: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth
  },
  lowerFooter: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  storeIcon: {
    marginLeft: 4
  }
});
var _default = ConnectingView;
exports.default = _default;
//# sourceMappingURL=ConnectingView.js.map