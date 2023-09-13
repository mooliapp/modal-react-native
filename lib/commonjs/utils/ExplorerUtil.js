"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExplorerUtil = void 0;
var _reactNative = require("react-native");
var _package = require("../../package.json");
var _package2 = require("@walletconnect/universal-provider/package.json");
var _CoreUtil = require("./CoreUtil");
var _ConfigCtrl = require("../controllers/ConfigCtrl");
var _ToastCtrl = require("../controllers/ToastCtrl");
var _AppInstalled = require("../modules/AppInstalled");
var _Platform = require("../constants/Platform");
var _StorageUtil = require("./StorageUtil");
// -- Helpers -------------------------------------------------------
const W3M_API = 'https://explorer-api.walletconnect.com';
function getSdkVersion() {
  return `rn-${_package.version}`;
}
function getUserAgent() {
  return `wcm-rn-${_package.version}/js-${_package2.version}/${_reactNative.Platform.OS}-${_reactNative.Platform.Version}`;
}
async function fetchListings(endpoint, params, headers) {
  const url = new URL(endpoint, W3M_API);
  url.searchParams.append('projectId', _ConfigCtrl.ConfigCtrl.state.projectId);
  url.searchParams.append('sdkType', 'wcm');
  url.searchParams.append('sdkVersion', getSdkVersion());
  if (params) {
    Object.entries(params).forEach(_ref => {
      let [key, value] = _ref;
      if (value) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  const request = await fetch(url.toString(), {
    headers
  });
  return request.json();
}
function getUrlParams(url) {
  if (!url) {
    return {};
  }
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params = {};
  let match;
  while ((match = regex.exec(url)) !== null) {
    params[match[1]] = decodeURIComponent(match[2]);
  }
  return params;
}
function getAppId(playstoreLink) {
  var _getUrlParams;
  if (!playstoreLink || !playstoreLink.match(_Platform.PLAYSTORE_REGEX)) {
    return undefined;
  }
  const applicationId = (_getUrlParams = getUrlParams(playstoreLink)) === null || _getUrlParams === void 0 ? void 0 : _getUrlParams.id;
  return applicationId;
}

// -- Utility -------------------------------------------------------
const ExplorerUtil = {
  async getListings(params) {
    const headers = this.getCustomHeaders();
    const extendedParams = {
      ...params,
      version: 2
    };
    const platform = _reactNative.Platform.select({
      ios: 'iOS',
      android: 'Android',
      default: 'Mobile'
    });
    return fetchListings(`/w3m/v1/get${platform}Listings`, extendedParams, headers);
  },
  getWalletImageUrl(imageId) {
    if (!imageId) return undefined;
    return `${W3M_API}/w3m/v1/getWalletImage/${imageId}?projectId=${_ConfigCtrl.ConfigCtrl.state.projectId}`;
  },
  async navigateDeepLink(universalLink, deepLink, wcURI) {
    try {
      const nativeUrl = _CoreUtil.CoreUtil.formatNativeUrl(deepLink, wcURI);
      const universalUrl = _CoreUtil.CoreUtil.formatUniversalUrl(universalLink, wcURI);
      if (nativeUrl) {
        _StorageUtil.StorageUtil.setDeepLinkWallet(deepLink);
        await _reactNative.Linking.openURL(nativeUrl).catch(() => {
          // Fallback to universal link
          if (universalUrl && universalLink) {
            _reactNative.Linking.openURL(universalUrl);
            _StorageUtil.StorageUtil.setDeepLinkWallet(universalLink);
          } else {
            _ToastCtrl.ToastCtrl.openToast('Unable to open the wallet', 'error');
          }
        });
      } else if (universalUrl) {
        _reactNative.Linking.openURL(universalUrl);
        _StorageUtil.StorageUtil.setDeepLinkWallet(universalLink);
      } else {
        _ToastCtrl.ToastCtrl.openToast('Unable to open the wallet', 'error');
      }
    } catch (error) {
      _StorageUtil.StorageUtil.removeDeepLinkWallet();
      _ToastCtrl.ToastCtrl.openToast('Unable to open the wallet', 'error');
    }
  },
  getCustomHeaders() {
    const referer = _ConfigCtrl.ConfigCtrl.getMetadata().name.trim().replace(' ', '');
    return {
      'User-Agent': getUserAgent(),
      'Referer': referer
    };
  },
  async isAppInstalled(wallet) {
    let isInstalled = false;
    const scheme = wallet.mobile.native;
    const appId = getAppId(wallet.app.android);
    try {
      isInstalled = await (0, _AppInstalled.isAppInstalled)(scheme, appId);
    } catch {
      isInstalled = false;
    }
    return isInstalled;
  },
  async sortInstalled(array) {
    const promises = array.map(async item => {
      return {
        ...item,
        isInstalled: await ExplorerUtil.isAppInstalled(item)
      };
    });
    const results = await Promise.all(promises);
    results.sort((a, b) => {
      if (a.isInstalled && b.isInstalled) return 0;
      if (a.isInstalled) return -1;
      if (b.isInstalled) return 1;
      return 0;
    });
    return results;
  },
  async prefetchWalletImages(wallets) {
    var _Image$queryCache;
    const urls = wallets.filter(wallet => wallet.image_id).map(wallet => this.getWalletImageUrl(wallet.image_id));
    const cachedUrls = await ((_Image$queryCache = _reactNative.Image.queryCache) === null || _Image$queryCache === void 0 ? void 0 : _Image$queryCache.call(_reactNative.Image, urls));
    wallets.forEach(wallet => {
      try {
        if (wallet.image_id) {
          const walletImage = this.getWalletImageUrl(wallet.image_id);
          if (!walletImage || cachedUrls !== null && cachedUrls !== void 0 && cachedUrls[walletImage]) return;
          _reactNative.Image.prefetch(this.getWalletImageUrl(wallet.image_id));
        }
      } catch (error) {}
    });
  }
};
exports.ExplorerUtil = ExplorerUtil;
//# sourceMappingURL=ExplorerUtil.js.map