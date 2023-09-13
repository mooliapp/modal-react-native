"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExplorerCtrl = void 0;
var _valtio = require("valtio");
var _ExplorerUtil = require("../utils/ExplorerUtil");
var _CoreUtil = require("../utils/CoreUtil");
var _ConfigCtrl = require("./ConfigCtrl");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  wallets: {
    listings: [],
    total: 0,
    page: 1
  },
  recommendedWallets: []
});

// -- controller --------------------------------------------------- //
const ExplorerCtrl = {
  state,
  async getWallets(params) {
    const extendedParams = {
      ...params
    };
    const {
      explorerRecommendedWalletIds,
      explorerExcludedWalletIds
    } = _ConfigCtrl.ConfigCtrl.state;

    // Don't fetch any wallets if explorer is disabled or if they are all excluded
    if (explorerRecommendedWalletIds === 'NONE' || explorerExcludedWalletIds === 'ALL' && !_CoreUtil.CoreUtil.isArray(explorerRecommendedWalletIds)) {
      return state.wallets;
    }

    // Fetch only user recommended wallets if the rest is excluded
    if (explorerExcludedWalletIds === 'ALL' && _CoreUtil.CoreUtil.isArray(explorerRecommendedWalletIds)) {
      extendedParams.recommendedIds = explorerRecommendedWalletIds.join(',');
    }

    // Don't fetch user defined excluded wallets
    if (_CoreUtil.CoreUtil.isArray(explorerExcludedWalletIds)) {
      extendedParams.excludedIds = explorerExcludedWalletIds.join(',');
    }
    const {
      listings,
      total
    } = await _ExplorerUtil.ExplorerUtil.getListings(extendedParams);
    let _listings = Object.values(listings);

    // Sort by explorerRecommendedWalletIds
    if (_CoreUtil.CoreUtil.isArray(explorerRecommendedWalletIds)) {
      _listings.sort((a, b) => {
        const aIndex = explorerRecommendedWalletIds.indexOf(a.id);
        const bIndex = explorerRecommendedWalletIds.indexOf(b.id);

        // Don't sort if both wallets are not recommended
        if (aIndex === -1 && bIndex === -1) return 0;

        // if a is not recommended, b is first
        if (aIndex === -1) return 1;

        // if b is not recommended, a is first
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    }

    // Sort by installed wallets
    _listings = await _ExplorerUtil.ExplorerUtil.sortInstalled(_listings);

    // Set recommended wallets
    if (_CoreUtil.CoreUtil.isArray(explorerRecommendedWalletIds)) {
      state.recommendedWallets = _listings.filter(wallet => explorerRecommendedWalletIds.includes(wallet.id)).slice(0, 11);
    } else {
      state.recommendedWallets = _listings.slice(0, 11);
    }

    // Prefetch some wallet images
    _ExplorerUtil.ExplorerUtil.prefetchWalletImages(_listings.slice(0, 20));
    state.wallets = {
      listings: _listings,
      page: 1,
      total
    };
    return _listings;
  },
  getWalletImageUrl(imageId) {
    return _ExplorerUtil.ExplorerUtil.getWalletImageUrl(imageId);
  }
};
exports.ExplorerCtrl = ExplorerCtrl;
//# sourceMappingURL=ExplorerCtrl.js.map