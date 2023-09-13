"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletConnectModal = WalletConnectModal;
var _reactNative = require("react-native");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
var _valtio = require("valtio");
var _ModalBackcard = _interopRequireDefault(require("./ModalBackcard"));
var _ModalRouter = require("./ModalRouter");
var _ModalCtrl = require("../controllers/ModalCtrl");
var _RouterCtrl = require("../controllers/RouterCtrl");
var _useConnectionHandler = require("../hooks/useConnectionHandler");
var _useConfigure = require("../hooks/useConfigure");
var _Toast = _interopRequireDefault(require("./Toast"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function WalletConnectModal(config) {
  (0, _useConfigure.useConfigure)(config);
  (0, _useConnectionHandler.useConnectionHandler)();
  const {
    open
  } = (0, _valtio.useSnapshot)(_ModalCtrl.ModalCtrl.state);
  const {
    history
  } = (0, _valtio.useSnapshot)(_RouterCtrl.RouterCtrl.state);
  const onBackButtonPress = () => {
    if (history.length > 1) {
      return _RouterCtrl.RouterCtrl.goBack();
    }
    return _ModalCtrl.ModalCtrl.close();
  };
  return /*#__PURE__*/React.createElement(_reactNativeModal.default, {
    isVisible: open,
    style: styles.modal,
    propagateSwipe: true,
    hideModalContentWhileAnimating: true,
    onBackdropPress: _ModalCtrl.ModalCtrl.close,
    onBackButtonPress: onBackButtonPress,
    useNativeDriver: true,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(_ModalBackcard.default, {
    onClose: _ModalCtrl.ModalCtrl.close
  }), /*#__PURE__*/React.createElement(_ModalRouter.ModalRouter, {
    onCopyClipboard: config.onCopyClipboard
  }), /*#__PURE__*/React.createElement(_Toast.default, null));
}
const styles = _reactNative.StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
//# sourceMappingURL=WalletConnectModal.js.map