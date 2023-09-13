import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useSnapshot } from 'valtio';
import ModalBackcard from './ModalBackcard';
import { ModalRouter } from './ModalRouter';
import { ModalCtrl } from '../controllers/ModalCtrl';
import { RouterCtrl } from '../controllers/RouterCtrl';
import { useConnectionHandler } from '../hooks/useConnectionHandler';
import { useConfigure } from '../hooks/useConfigure';
import Toast from './Toast';
export function WalletConnectModal(config) {
  useConfigure(config);
  useConnectionHandler();
  const {
    open
  } = useSnapshot(ModalCtrl.state);
  const {
    history
  } = useSnapshot(RouterCtrl.state);
  const onBackButtonPress = () => {
    if (history.length > 1) {
      return RouterCtrl.goBack();
    }
    return ModalCtrl.close();
  };
  return /*#__PURE__*/React.createElement(Modal, {
    isVisible: open,
    style: styles.modal,
    propagateSwipe: true,
    hideModalContentWhileAnimating: true,
    onBackdropPress: ModalCtrl.close,
    onBackButtonPress: onBackButtonPress,
    useNativeDriver: true,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(ModalBackcard, {
    onClose: ModalCtrl.close
  }), /*#__PURE__*/React.createElement(ModalRouter, {
    onCopyClipboard: config.onCopyClipboard
  }), /*#__PURE__*/React.createElement(Toast, null));
}
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});
//# sourceMappingURL=WalletConnectModal.js.map