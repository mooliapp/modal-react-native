import { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    isAppInstalled(packageName?: string): Promise<boolean>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeInstalledApp.d.ts.map