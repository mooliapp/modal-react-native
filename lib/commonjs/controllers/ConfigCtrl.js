"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCtrl = void 0;
var _valtio = require("valtio");
var _StorageUtil = require("../utils/StorageUtil");
// -- initial state ------------------------------------------------ //
const state = (0, _valtio.proxy)({
  projectId: '',
  sessionParams: undefined,
  recentWallet: undefined,
  providerMetadata: undefined,
  explorerRecommendedWalletIds: undefined,
  explorerExcludedWalletIds: undefined
});

// -- controller --------------------------------------------------- //
const ConfigCtrl = {
  state,
  setRecentWallet(wallet) {
    state.recentWallet = wallet;
  },
  getRecentWallet() {
    return state.recentWallet;
  },
  getMetadata() {
    if (!state.providerMetadata) {
      throw new Error('Metadata not set');
    }
    return state.providerMetadata;
  },
  setConfig(config) {
    const {
      projectId,
      providerMetadata,
      sessionParams
    } = config;
    if (projectId && projectId !== state.projectId) {
      state.projectId = projectId;
    }
    if (providerMetadata && state.providerMetadata !== providerMetadata) {
      state.providerMetadata = providerMetadata;
    }
    if (sessionParams && sessionParams !== state.sessionParams) {
      state.sessionParams = sessionParams;
    }
    state.explorerRecommendedWalletIds = config.explorerRecommendedWalletIds;
    state.explorerExcludedWalletIds = config.explorerExcludedWalletIds;
  },
  async loadRecentWallet() {
    state.recentWallet = await _StorageUtil.StorageUtil.getRecentWallet();
  }
};
exports.ConfigCtrl = ConfigCtrl;
//# sourceMappingURL=ConfigCtrl.js.map