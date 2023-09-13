import { type ReactNode } from 'react';
interface Props {
    title?: string;
    onActionPress?: () => void;
    actionIcon?: ReactNode;
    actionDisabled?: boolean;
    shadow?: boolean;
    children?: ReactNode;
}
declare function ModalHeader({ title, onActionPress, actionIcon, actionDisabled, shadow, children, }: Props): JSX.Element;
export default ModalHeader;
//# sourceMappingURL=ModalHeader.d.ts.map