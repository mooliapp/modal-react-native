import type { Listing } from '../types/controllerTypes';
export declare const DataUtil: {
    setRecentWallet(wallet: Listing): void;
    getRecentWallet(): Listing | undefined;
    getInitialWallets(): Listing[];
    getAllWallets({ search }: {
        search?: string | undefined;
    }): Listing[];
};
//# sourceMappingURL=DataUtil.d.ts.map