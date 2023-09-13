"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoreUtil = void 0;
const CoreUtil = {
  RECOMMENDED_WALLET_AMOUNT: 11,
  isHttpUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://');
  },
  formatNativeUrl(appUrl, wcUri) {
    if (!appUrl) return undefined;
    if (CoreUtil.isHttpUrl(appUrl)) {
      return this.formatUniversalUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.includes('://')) {
      safeAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '');
      safeAppUrl = `${safeAppUrl}://`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return `${safeAppUrl}wc?uri=${encodedWcUrl}`;
  },
  formatUniversalUrl(appUrl, wcUri) {
    if (!appUrl) return undefined;
    if (!CoreUtil.isHttpUrl(appUrl)) {
      return this.formatNativeUrl(appUrl, wcUri);
    }
    let plainAppUrl = appUrl;
    if (appUrl.endsWith('/')) {
      plainAppUrl = appUrl.slice(0, -1);
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return `${plainAppUrl}/wc?uri=${encodedWcUrl}`;
  },
  isArray(data) {
    return Array.isArray(data) && data.length > 0;
  }
};
exports.CoreUtil = CoreUtil;
//# sourceMappingURL=CoreUtil.js.map