import type { ModalCtrlState } from '../types/controllerTypes';
export interface OpenOptions {
    route?: 'ConnectWallet' | 'Qrcode' | 'WalletExplorer';
}
export declare const ModalCtrl: {
    state: ModalCtrlState;
    open(options?: OpenOptions): Promise<void>;
    close(): void;
};
//# sourceMappingURL=ModalCtrl.d.ts.map