import type { Listing, ListingParams, ListingResponse } from '../types/controllerTypes';
export declare const ExplorerUtil: {
    getListings(params?: ListingParams): Promise<ListingResponse>;
    getWalletImageUrl(imageId?: string): string | undefined;
    navigateDeepLink(universalLink: string | undefined, deepLink: string | undefined, wcURI: string): Promise<void>;
    getCustomHeaders(): {
        'User-Agent': string;
        Referer: string;
    };
    isAppInstalled(wallet: Listing): Promise<boolean>;
    sortInstalled(array: Listing[]): Promise<{
        isInstalled: boolean;
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
        mobile: import("../types/controllerTypes").PlatformInfo;
        desktop: import("../types/controllerTypes").PlatformInfo;
    }[]>;
    prefetchWalletImages(wallets: Listing[]): Promise<void>;
};
//# sourceMappingURL=ExplorerUtil.d.ts.map