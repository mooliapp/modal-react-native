/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import type { Listing } from '../types/controllerTypes';
interface Props {
    onPress: any;
    wallets: Listing[];
    style?: StyleProp<ViewStyle>;
}
declare function ViewAllBox({ onPress, wallets, style }: Props): JSX.Element;
export default ViewAllBox;
//# sourceMappingURL=ViewAllBox.d.ts.map