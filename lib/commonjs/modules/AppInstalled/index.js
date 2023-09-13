"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAppInstalled = isAppInstalled;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-installed-app' doesn't seem to be linked. Make sure: \n\n` + '- You rebuilt the app after installing the package\n' + '- You are not using Expo\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const InstalledAppModule = isTurboModuleEnabled ? _reactNative.Platform.OS === 'android' ? require('./NativeInstalledApp').default : undefined : _reactNative.NativeModules.InstalledApp;
const InstalledApp = InstalledAppModule ? InstalledAppModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
async function isAppInstalledIos(deepLink) {
  try {
    return deepLink ? _reactNative.Linking.canOpenURL(deepLink) : Promise.resolve(false);
  } catch (error) {
    return Promise.resolve(false);
  }
}
async function isAppInstalledAndroid(packageName) {
  try {
    return packageName ? InstalledApp.isAppInstalled(packageName) : Promise.resolve(false);
  } catch (error) {
    return Promise.resolve(false);
  }
}
async function isAppInstalled(deepLink, packageName) {
  try {
    return _reactNative.Platform.select({
      ios: isAppInstalledIos(deepLink),
      android: isAppInstalledAndroid(packageName),
      default: Promise.resolve(false)
    });
  } catch (error) {
    Promise.resolve(false);
  }
  return Promise.resolve(false);
}
//# sourceMappingURL=index.js.map