"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  WalletConnectModal: true,
  useWalletConnectModal: true,
  IProvider: true,
  IProviderMetadata: true
};
Object.defineProperty(exports, "IProvider", {
  enumerable: true,
  get: function () {
    return _coreTypes.IProvider;
  }
});
Object.defineProperty(exports, "IProviderMetadata", {
  enumerable: true,
  get: function () {
    return _coreTypes.IProviderMetadata;
  }
});
Object.defineProperty(exports, "WalletConnectModal", {
  enumerable: true,
  get: function () {
    return _WalletConnectModal.WalletConnectModal;
  }
});
Object.defineProperty(exports, "useWalletConnectModal", {
  enumerable: true,
  get: function () {
    return _useWalletConnectModal.useWalletConnectModal;
  }
});
require("react-native-get-random-values");
require("@walletconnect/react-native-compat");
require("@ethersproject/shims");
require("./config/animations");
var _controllers = require("./controllers");
Object.keys(_controllers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _controllers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _controllers[key];
    }
  });
});
var _WalletConnectModal = require("./components/WalletConnectModal");
var _useWalletConnectModal = require("./hooks/useWalletConnectModal");
var _coreTypes = require("./types/coreTypes");
//# sourceMappingURL=index.js.map