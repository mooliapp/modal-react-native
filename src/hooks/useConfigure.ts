import { useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSnapshot } from 'valtio';
import { SUBSCRIBER_EVENTS } from '@walletconnect/core';
import type UniversalProvider from '@walletconnect/universal-provider';

import {
  ExplorerCtrl,
  OptionsCtrl,
  ConfigCtrl,
  ClientCtrl,
  AccountCtrl,
  WcConnectionCtrl,
} from '../controllers';
import type { IProviderMetadata } from '../types/coreTypes';
import { createUniversalProvider } from '../utils/ProviderUtil';
import { StorageUtil } from '../utils/StorageUtil';
import { ThemeCtrl } from '../controllers/ThemeCtrl';
import { ToastCtrl } from '../controllers/ToastCtrl';
import type { ThemeCtrlState } from '../types/controllerTypes';

interface Props {
  projectId: string;
  providerMetadata: IProviderMetadata;
  relayUrl?: string;
  themeMode?: ThemeCtrlState['themeMode'];
  accentColor?: ThemeCtrlState['accentColor'];
}

export function useConfigure(config: Props) {
  const colorScheme = useColorScheme();
  const { projectId, providerMetadata, relayUrl } = config;

  const provider = useSnapshot(ClientCtrl.state).provider as
    | UniversalProvider
    | undefined;

  const resetApp = useCallback(() => {
    ClientCtrl.resetSession();
    AccountCtrl.resetAccount();
    WcConnectionCtrl.resetConnection();
    StorageUtil.removeDeepLinkWallet();
  }, []);

  const onSessionDelete = useCallback(
    ({ topic }: { topic: string }) => {
      const session = ClientCtrl.session();
      if (session && topic === session.topic) {
        resetApp();
      }
    },
    [resetApp]
  );

  const onDisplayUri = useCallback(async (uri: string) => {
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
   * Fetch wallet list
   */
  useEffect(() => {
    async function fetchWallets() {
      try {
        if (!ExplorerCtrl.state.wallets.total) {
          await ExplorerCtrl.getWallets();
          OptionsCtrl.setIsDataLoaded(true);
        }
      } catch (error) {
        ToastCtrl.openToast('Network error', 'error');
      }
    }
    fetchWallets();
  }, []);

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
            metadata: providerMetadata,
          });
          ClientCtrl.setProvider(newProvider);
          return;
        }

        provider.on('display_uri', onDisplayUri);
        provider.client.core.relayer.subscriber.on(
          SUBSCRIBER_EVENTS.deleted,
          onSessionDelete
        );

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
  }, [
    provider,
    projectId,
    providerMetadata,
    relayUrl,
    onDisplayUri,
    onSessionDelete,
  ]);
}
