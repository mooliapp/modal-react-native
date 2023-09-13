import type { ClientCtrlState } from '../types/controllerTypes';
export declare const ClientCtrl: {
    state: ClientCtrlState;
    setProvider(provider: ClientCtrlState['provider']): void;
    setInitialized(initialized: ClientCtrlState['initialized']): void;
    setSession(session: ClientCtrlState['session']): void;
    provider(): import("@walletconnect/universal-provider").IUniversalProvider | undefined;
    session(): import("@walletconnect/types").SessionTypes.Struct | undefined;
    resetSession(): void;
};
//# sourceMappingURL=ClientCtrl.d.ts.map