"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _ModalHeader = _interopRequireDefault(require("../components/ModalHeader"));
var _QRCode = _interopRequireDefault(require("../components/QRCode"));
var _CopyLarge = _interopRequireDefault(require("../assets/CopyLarge"));
var _WcConnectionCtrl = require("../controllers/WcConnectionCtrl");
var _ThemeCtrl = require("../controllers/ThemeCtrl");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ToastCtrl = require("../controllers/ToastCtrl");
var _react = require("react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function QRCodeView(_ref) {
  let {
    onCopyClipboard,
    isPortrait,
    windowHeight,
    windowWidth
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const QRSize = isPortrait ? Math.round(windowWidth * 0.8) : Math.round(windowHeight * 0.6);
  const themeState = (0, _valtio.useSnapshot)(_ThemeCtrl.ThemeCtrl.state);
  const {
    pairingUri,
    pairingError
  } = (0, _valtio.useSnapshot)(_WcConnectionCtrl.WcConnectionCtrl.state);
  const onCopy = async () => {
    if (onCopyClipboard && pairingUri) {
      onCopyClipboard(pairingUri);
      _ToastCtrl.ToastCtrl.openToast('Link copied', 'success');
    }
  };
  (0, _react.useEffect)(() => {
    if (pairingError) {
      _ToastCtrl.ToastCtrl.openToast('Connection request declined', 'error');
    }
  }, [pairingError]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ModalHeader.default, {
    title: "Scan the code",
    actionIcon: /*#__PURE__*/React.createElement(_CopyLarge.default, {
      width: 22,
      height: 22,
      fill: !pairingUri ? Theme.foreground3 : Theme.accent
    }),
    onActionPress: onCopyClipboard ? onCopy : undefined,
    actionDisabled: !pairingUri
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: Theme.background1
    }]
  }, pairingUri ? /*#__PURE__*/React.createElement(_QRCode.default, {
    uri: pairingUri,
    size: QRSize,
    theme: themeState.themeMode
  }) : /*#__PURE__*/React.createElement(_reactNative.ActivityIndicator, {
    style: {
      height: QRSize
    },
    color: Theme.accent
  })));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingBottom: 16,
    width: '100%'
  }
});
var _default = QRCodeView;
exports.default = _default;
//# sourceMappingURL=QRCodeView.js.map