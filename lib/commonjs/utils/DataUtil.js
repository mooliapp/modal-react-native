"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataUtil = void 0;
var _ConfigCtrl = require("../controllers/ConfigCtrl");
var _ExplorerCtrl = require("../controllers/ExplorerCtrl");
var _StorageUtil = require("./StorageUtil");
const DataUtil = {
  setRecentWallet(wallet) {
    _ConfigCtrl.ConfigCtrl.setRecentWallet(wallet);
    _StorageUtil.StorageUtil.setRecentWallet(wallet);
  },
  getRecentWallet() {
    return _ConfigCtrl.ConfigCtrl.getRecentWallet();
  },
  getInitialWallets() {
    const {
      recommendedWallets
    } = _ExplorerCtrl.ExplorerCtrl.state;
    const {
      recentWallet
    } = _ConfigCtrl.ConfigCtrl.state;
    const _wallets = [...recommendedWallets];
    if (recentWallet) {
      const recentWalletIndex = _wallets.findIndex(wallet => wallet.id === recentWallet.id);
      if (recentWalletIndex > -1) {
        _wallets.splice(recentWalletIndex, 1);
      }
      _wallets.unshift(recentWallet);
    }
    return _wallets;
  },
  getAllWallets(_ref) {
    let {
      search
    } = _ref;
    const {
      wallets
    } = _ExplorerCtrl.ExplorerCtrl.state;
    const {
      recentWallet
    } = _ConfigCtrl.ConfigCtrl.state;
    const _wallets = [...wallets.listings];
    if (recentWallet) {
      const recentWalletIndex = _wallets.findIndex(wallet => wallet.id === recentWallet.id);
      if (recentWalletIndex > -1) {
        _wallets.splice(recentWalletIndex, 1);
        _wallets.unshift(recentWallet);
      }
    }
    if (search) {
      return _wallets.filter(wallet => {
        return wallet.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    return _wallets;
  }
};
exports.DataUtil = DataUtil;
//# sourceMappingURL=DataUtil.js.map