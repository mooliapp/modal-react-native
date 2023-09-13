/// <reference types="react" />
import { ImageStyle, StyleProp } from 'react-native';
interface Props {
    size: 'xs' | 'sm' | 'md' | 'lg';
    url?: string;
    style?: StyleProp<ImageStyle>;
}
declare function WalletImage({ url, size, style }: Props): JSX.Element;
export default WalletImage;
//# sourceMappingURL=WalletImage.d.ts.map