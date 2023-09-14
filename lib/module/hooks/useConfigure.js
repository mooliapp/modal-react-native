import { useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSnapshot } from 'valtio';
import { SUBSCRIBER_EVENTS } from '@walletconnect/core';
import { ExplorerCtrl, OptionsCtrl, ConfigCtrl, ClientCtrl, AccountCtrl, WcConnectionCtrl } from '../controllers';
import { createUniversalProvider } from '../utils/ProviderUtil';
import { StorageUtil } from '../utils/StorageUtil';
import { ThemeCtrl } from '../controllers/ThemeCtrl';
import { ToastCtrl } from '../controllers/ToastCtrl';
export function useConfigure(config) {
  const colorScheme = useColorScheme();
  const {
    projectId,
    providerMetadata,
    relayUrl
  } = config;
  const {
    isDataLoaded
  } = useSnapshot(OptionsCtrl.state);
  const {
    provider
  } = useSnapshot(ClientCtrl.state);
  const resetApp = useCallback(() => {
    ClientCtrl.resetSession();
    AccountCtrl.resetAccount();
    WcConnectionCtrl.resetConnection();
    StorageUtil.removeDeepLinkWallet();
  }, []);
  const onSessionDelete = useCallback(_ref => {
    let {
      topic
    } = _ref;
    const session = ClientCtrl.session();
    if (session && topic === session.topic) {
      resetApp();
    }
  }, [resetApp]);
  const onDisplayUri = useCallback(async uri => {
    WcConnectionCtrl.setPairingUri(uri);
  }, []);
  useEffect(() => {
    if (!projectId) {
      console.error('projectId not found');
    }
  }, [projectId]);

  /**
   * Set theme mode
   */
  useEffect(() => {
    ThemeCtrl.setThemeMode(config.themeMode || colorScheme);
    ThemeCtrl.setAccentColor(config.accentColor);
  }, [config.themeMode, config.accentColor, colorScheme]);

  /**
   * Set config
   */
  useEffect(() => {
    ConfigCtrl.setConfig(config);
    ConfigCtrl.loadRecentWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetch wallet list if not yet loaded
   */
  useEffect(() => {
    async function fetchWallets() {
      try {
        if (!isDataLoaded) {
          await ExplorerCtrl.getWallets();
          OptionsCtrl.setIsDataLoaded(true);
        }
      } catch (error) {
        ToastCtrl.openToast('Network error', 'error');
      }
    }
    fetchWallets();
  }, [isDataLoaded]);

  /**
   * Initialize provider
   */
  useEffect(() => {
    async function initProvider() {
      try {
        if (!provider) {
          const newProvider = await createUniversalProvider({
            projectId,
            relayUrl,
            metadata: providerMetadata
          });
          ClientCtrl.setProvider(newProvider);
          return;
        }
        provider.on('display_uri', onDisplayUri);
        provider.client.core.relayer.subscriber.on(SUBSCRIBER_EVENTS.deleted, onSessionDelete);

        // Check if there is an active session
        if (provider.session) {
          ClientCtrl.setSession(provider.session);
          await AccountCtrl.getAccount();
        }
        ClientCtrl.setInitialized(true);
      } catch (error) {
        console.error('Error initializing WalletConnect SDK', error);
      }
    }
    initProvider();
  }, [provider, projectId, providerMetadata, relayUrl, onDisplayUri, onSessionDelete]);
}
//# sourceMappingURL=useConfigure.js.map