/// <reference types="react" />
import { ImageProps as NativeProps } from 'react-native';
export type ImageProps = Omit<NativeProps, 'source'> & {
    source: string;
};
declare function Image({ source, style }: ImageProps): JSX.Element;
export default Image;
//# sourceMappingURL=Image.d.ts.map