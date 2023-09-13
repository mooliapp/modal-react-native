import type { ExplorerCtrlState, ListingParams } from '../types/controllerTypes';
export declare const ExplorerCtrl: {
    state: ExplorerCtrlState;
    getWallets(params?: ListingParams): Promise<(import("../types/controllerTypes").ListingResponse & {
        page: number;
    }) | import("../types/controllerTypes").Listing[]>;
    getWalletImageUrl(imageId: string): string | undefined;
};
//# sourceMappingURL=ExplorerCtrl.d.ts.map