import { Image, Linking, Platform } from 'react-native';
import { version } from '../../package.json';
import { version as providerVersion } from '@walletconnect/universal-provider/package.json';
import { CoreUtil } from './CoreUtil';
import { ConfigCtrl } from '../controllers/ConfigCtrl';
import { ToastCtrl } from '../controllers/ToastCtrl';
import { isAppInstalled } from '../modules/AppInstalled';
import { PLAYSTORE_REGEX } from '../constants/Platform';
import { StorageUtil } from './StorageUtil';

// -- Helpers -------------------------------------------------------
const W3M_API = 'https://explorer-api.walletconnect.com';
function getSdkVersion() {
  return `rn-${version}`;
}
function getUserAgent() {
  return `wcm-rn-${version}/js-${providerVersion}/${Platform.OS}-${Platform.Version}`;
}
async function fetchListings(endpoint, params, headers) {
  const url = new URL(endpoint, W3M_API);
  url.searchParams.append('projectId', ConfigCtrl.state.projectId);
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
  if (!playstoreLink || !playstoreLink.match(PLAYSTORE_REGEX)) {
    return undefined;
  }
  const applicationId = (_getUrlParams = getUrlParams(playstoreLink)) === null || _getUrlParams === void 0 ? void 0 : _getUrlParams.id;
  return applicationId;
}

// -- Utility -------------------------------------------------------
export const ExplorerUtil = {
  async getListings(params) {
    const headers = this.getCustomHeaders();
    const extendedParams = {
      ...params,
      version: 2
    };
    const platform = Platform.select({
      ios: 'iOS',
      android: 'Android',
      default: 'Mobile'
    });
    return fetchListings(`/w3m/v1/get${platform}Listings`, extendedParams, headers);
  },
  getWalletImageUrl(imageId) {
    if (!imageId) return undefined;
    return `${W3M_API}/w3m/v1/getWalletImage/${imageId}?projectId=${ConfigCtrl.state.projectId}`;
  },
  async navigateDeepLink(universalLink, deepLink, wcURI) {
    try {
      const nativeUrl = CoreUtil.formatNativeUrl(deepLink, wcURI);
      const universalUrl = CoreUtil.formatUniversalUrl(universalLink, wcURI);
      if (nativeUrl) {
        StorageUtil.setDeepLinkWallet(deepLink);
        await Linking.openURL(nativeUrl).catch(() => {
          // Fallback to universal link
          if (universalUrl && universalLink) {
            Linking.openURL(universalUrl);
            StorageUtil.setDeepLinkWallet(universalLink);
          } else {
            ToastCtrl.openToast('Unable to open the wallet', 'error');
          }
        });
      } else if (universalUrl) {
        Linking.openURL(universalUrl);
        StorageUtil.setDeepLinkWallet(universalLink);
      } else {
        ToastCtrl.openToast('Unable to open the wallet', 'error');
      }
    } catch (error) {
      StorageUtil.removeDeepLinkWallet();
      ToastCtrl.openToast('Unable to open the wallet', 'error');
    }
  },
  getCustomHeaders() {
    const referer = ConfigCtrl.getMetadata().name.trim().replace(' ', '');
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
      isInstalled = await isAppInstalled(scheme, appId);
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
    const cachedUrls = await ((_Image$queryCache = Image.queryCache) === null || _Image$queryCache === void 0 ? void 0 : _Image$queryCache.call(Image, urls));
    wallets.forEach(wallet => {
      try {
        if (wallet.image_id) {
          const walletImage = this.getWalletImageUrl(wallet.image_id);
          if (!walletImage || cachedUrls !== null && cachedUrls !== void 0 && cachedUrls[walletImage]) return;
          Image.prefetch(this.getWalletImageUrl(wallet.image_id));
        }
      } catch (error) {}
    });
  }
};
//# sourceMappingURL=ExplorerUtil.js.map