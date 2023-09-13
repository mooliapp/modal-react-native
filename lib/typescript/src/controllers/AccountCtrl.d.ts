import type { AccountCtrlState } from '../types/controllerTypes';
export declare const AccountCtrl: {
    state: AccountCtrlState;
    getAccount(): Promise<void>;
    setAddress(address: AccountCtrlState['address']): void;
    setIsConnected(isConnected: AccountCtrlState['isConnected']): void;
    resetAccount(): void;
};
//# sourceMappingURL=AccountCtrl.d.ts.map