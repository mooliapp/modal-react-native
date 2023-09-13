import type { SessionTypes } from '@walletconnect/types';
import type { IProviderMetadata, IProvider, ISessionParams } from './coreTypes';
export interface ClientCtrlState {
    initialized: boolean;
    provider?: IProvider;
    session?: SessionTypes.Struct;
}
export interface ConfigCtrlState {
    projectId: string;
    sessionParams?: ISessionParams;
    recentWallet?: Listing;
    providerMetadata?: IProviderMetadata;
    explorerRecommendedWalletIds?: string[] | 'NONE';
    explorerExcludedWalletIds?: string[] | 'ALL';
}
export interface ModalCtrlState {
    open: boolean;
}
export interface OptionsCtrlState {
    isDataLoaded: boolean;
}
export interface AccountCtrlState {
    address?: string;
    isConnected: boolean;
}
export interface WcConnectionCtrlState {
    pairingUri: string;
    pairingEnabled: boolean;
    pairingError: Error | null;
}
export interface ThemeCtrlState {
    themeMode?: 'dark' | 'light';
    accentColor?: string;
}
export interface ToastCtrlState {
    open: boolean;
    message: string;
    variant: 'error' | 'success';
}
export interface ExplorerCtrlState {
    wallets: ListingResponse & {
        page: number;
    };
    recommendedWallets: Listing[];
}
export interface ListingParams {
    page?: number;
    search?: string;
    entries?: number;
    version?: number;
    chains?: string;
    recommendedIds?: string;
    excludedIds?: string;
}
export interface PlatformInfo {
    native: string;
    universal: string;
}
export interface Listing {
    id: string;
    name: string;
    homepage: string;
    image_id: string;
    app: {
        browser: string;
        ios: string;
        android: string;
        mac: string;
        window: string;
        linux: string;
    };
    mobile: PlatformInfo;
    desktop: PlatformInfo;
    isInstalled: boolean;
}
export interface ListingResponse {
    listings: Listing[];
    total: number;
}
export type RouterView = 'ConnectWallet' | 'Qrcode' | 'WalletExplorer' | 'Connecting';
export interface RouterCtrlState {
    history: RouterView[];
    view: RouterView;
    data?: {
        wallet?: Listing;
    };
}
//# sourceMappingURL=controllerTypes.d.ts.map