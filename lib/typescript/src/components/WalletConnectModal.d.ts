/// <reference types="react" />
import type { ConfigCtrlState, ThemeCtrlState } from '../types/controllerTypes';
import type { IProviderMetadata, ISessionParams } from '../types/coreTypes';
export type Props = Omit<ConfigCtrlState, 'recentWallet'> & ThemeCtrlState & {
    providerMetadata: IProviderMetadata;
    sessionParams?: ISessionParams;
    relayUrl?: string;
    onCopyClipboard?: (value: string) => void;
};
export declare function WalletConnectModal(config: Props): JSX.Element;
//# sourceMappingURL=WalletConnectModal.d.ts.map