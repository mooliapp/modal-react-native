import type { Listing } from 'src/types/controllerTypes';
export declare const StorageUtil: {
    WALLETCONNECT_DEEPLINK_CHOICE: string;
    W3M_RECENT_WALLET_INFO: string;
    setDeepLinkWallet(link: string): Promise<void>;
    removeDeepLinkWallet(): Promise<void>;
    setRecentWallet(wallet: Listing): void;
    getRecentWallet(): Promise<any>;
};
//# sourceMappingURL=StorageUtil.d.ts.map