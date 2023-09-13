import type { IProviderMetadata } from '../types/coreTypes';
import type { ThemeCtrlState } from '../types/controllerTypes';
interface Props {
    projectId: string;
    providerMetadata: IProviderMetadata;
    relayUrl?: string;
    themeMode?: ThemeCtrlState['themeMode'];
    accentColor?: ThemeCtrlState['accentColor'];
}
export declare function useConfigure(config: Props): void;
export {};
//# sourceMappingURL=useConfigure.d.ts.map