/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import type { Listing } from '../types/controllerTypes';
interface Props {
    currentWCURI?: string;
    walletInfo: Listing;
    style?: StyleProp<ViewStyle>;
    isRecent?: boolean;
}
export declare const WALLET_MARGIN = 8;
export declare const WALLET_WIDTH = 80;
export declare const WALLET_HEIGHT = 98;
export declare const WALLET_FULL_HEIGHT: number;
declare function WalletItem({ currentWCURI, walletInfo, style, isRecent }: Props): JSX.Element;
export default WalletItem;
//# sourceMappingURL=WalletItem.d.ts.map