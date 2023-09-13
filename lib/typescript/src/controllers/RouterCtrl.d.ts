import type { RouterCtrlState } from '../types/controllerTypes';
export declare const RouterCtrl: {
    state: RouterCtrlState;
    push(view: RouterCtrlState['view'], data?: RouterCtrlState['data']): void;
    replace(view: RouterCtrlState['view']): void;
    goBack(): void;
};
//# sourceMappingURL=RouterCtrl.d.ts.map