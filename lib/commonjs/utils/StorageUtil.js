"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageUtil = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const StorageUtil = {
  WALLETCONNECT_DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',
  W3M_RECENT_WALLET_INFO: 'W3M_RECENT_WALLET_INFO',
  setDeepLinkWallet(link) {
    return _asyncStorage.default.setItem(StorageUtil.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
      href: link
    }));
  },
  removeDeepLinkWallet() {
    return _asyncStorage.default.removeItem(StorageUtil.WALLETCONNECT_DEEPLINK_CHOICE);
  },
  setRecentWallet(wallet) {
    try {
      _asyncStorage.default.setItem(StorageUtil.W3M_RECENT_WALLET_INFO, JSON.stringify(wallet));
    } catch (error) {
      console.info('Unable to set recent wallet');
    }
  },
  async getRecentWallet() {
    try {
      const wallet = await _asyncStorage.default.getItem(StorageUtil.W3M_RECENT_WALLET_INFO);
      return wallet ? JSON.parse(wallet) : undefined;
    } catch (error) {
      console.info('Unable to get recent wallet');
    }
    return undefined;
  }
};
exports.StorageUtil = StorageUtil;
//# sourceMappingURL=StorageUtil.js.map