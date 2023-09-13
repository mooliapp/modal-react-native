import type { ConfigCtrlState, Listing } from '../types/controllerTypes';
export declare const ConfigCtrl: {
    state: ConfigCtrlState;
    setRecentWallet(wallet?: Listing): void;
    getRecentWallet(): Listing | undefined;
    getMetadata(): import("..").IProviderMetadata;
    setConfig(config: Partial<ConfigCtrlState>): void;
    loadRecentWallet(): Promise<void>;
};
//# sourceMappingURL=ConfigCtrl.d.ts.map