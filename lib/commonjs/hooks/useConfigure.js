"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConfigure = useConfigure;
var _react = require("react");
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _core = require("@walletconnect/core");
var _controllers = require("../controllers");
var _ProviderUtil = require("../utils/ProviderUtil");
var _StorageUtil = require("../utils/StorageUtil");
var _ThemeCtrl = require("../controllers/ThemeCtrl");
var _ToastCtrl = require("../controllers/ToastCtrl");
function useConfigure(config) {
  const colorScheme = (0, _reactNative.useColorScheme)();
  const {
    projectId,
    providerMetadata,
    relayUrl
  } = config;
  const {
    isDataLoaded
  } = (0, _valtio.useSnapshot)(_controllers.OptionsCtrl.state);
  const {
    provider
  } = (0, _valtio.useSnapshot)(_controllers.ClientCtrl.state);
  const resetApp = (0, _react.useCallback)(() => {
    _controllers.ClientCtrl.resetSession();
    _controllers.AccountCtrl.resetAccount();
    _controllers.WcConnectionCtrl.resetConnection();
    _StorageUtil.StorageUtil.removeDeepLinkWallet();
  }, []);
  const onSessionDelete = (0, _react.useCallback)(_ref => {
    let {
      topic
    } = _ref;
    const session = _controllers.ClientCtrl.session();
    if (session && topic === session.topic) {
      resetApp();
    }
  }, [resetApp]);
  const onDisplayUri = (0, _react.useCallback)(async uri => {
    _controllers.WcConnectionCtrl.setPairingUri(uri);
  }, []);
  (0, _react.useEffect)(() => {
    if (!projectId) {
      console.error('projectId not found');
    }
  }, [projectId]);

  /**
   * Set theme mode
   */
  (0, _react.useEffect)(() => {
    _ThemeCtrl.ThemeCtrl.setThemeMode(config.themeMode || colorScheme);
    _ThemeCtrl.ThemeCtrl.setAccentColor(config.accentColor);
  }, [config.themeMode, config.accentColor, colorScheme]);

  /**
   * Set config
   */
  (0, _react.useEffect)(() => {
    _controllers.ConfigCtrl.setConfig(config);
    _controllers.ConfigCtrl.loadRecentWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetch wallet list if not yet loaded
   */
  (0, _react.useEffect)(() => {
    async function fetchWallets() {
      try {
        if (!isDataLoaded) {
          await _controllers.ExplorerCtrl.getWallets();
          _controllers.OptionsCtrl.setIsDataLoaded(true);
        }
      } catch (error) {
        _ToastCtrl.ToastCtrl.openToast('Network error', 'error');
      }
    }
    fetchWallets();
  }, [isDataLoaded]);

  /**
   * Initialize provider
   */
  (0, _react.useEffect)(() => {
    async function initProvider() {
      try {
        if (!provider) {
          const newProvider = await (0, _ProviderUtil.createUniversalProvider)({
            projectId,
            relayUrl,
            metadata: providerMetadata
          });
          _controllers.ClientCtrl.setProvider(newProvider);
          return;
        }
        provider.on('display_uri', onDisplayUri);
        provider.client.core.relayer.subscriber.on(_core.SUBSCRIBER_EVENTS.deleted, onSessionDelete);

        // Check if there is an active session
        if (provider.session) {
          _controllers.ClientCtrl.setSession(provider.session);
          await _controllers.AccountCtrl.getAccount();
        }
        _controllers.ClientCtrl.setInitialized(true);
      } catch (error) {
        console.error('Error initializing WalletConnect SDK', error);
      }
    }
    initProvider();
  }, [provider, projectId, providerMetadata, relayUrl, onDisplayUri, onSessionDelete]);
}
//# sourceMappingURL=useConfigure.js.map