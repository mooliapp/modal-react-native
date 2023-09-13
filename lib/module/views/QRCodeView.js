import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';
import ModalHeader from '../components/ModalHeader';
import QRCode from '../components/QRCode';
import CopyIcon from '../assets/CopyLarge';
import { WcConnectionCtrl } from '../controllers/WcConnectionCtrl';
import { ThemeCtrl } from '../controllers/ThemeCtrl';
import useTheme from '../hooks/useTheme';
import { ToastCtrl } from '../controllers/ToastCtrl';
import { useEffect } from 'react';
function QRCodeView(_ref) {
  let {
    onCopyClipboard,
    isPortrait,
    windowHeight,
    windowWidth
  } = _ref;
  const Theme = useTheme();
  const QRSize = isPortrait ? Math.round(windowWidth * 0.8) : Math.round(windowHeight * 0.6);
  const themeState = useSnapshot(ThemeCtrl.state);
  const {
    pairingUri,
    pairingError
  } = useSnapshot(WcConnectionCtrl.state);
  const onCopy = async () => {
    if (onCopyClipboard && pairingUri) {
      onCopyClipboard(pairingUri);
      ToastCtrl.openToast('Link copied', 'success');
    }
  };
  useEffect(() => {
    if (pairingError) {
      ToastCtrl.openToast('Connection request declined', 'error');
    }
  }, [pairingError]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ModalHeader, {
    title: "Scan the code",
    actionIcon: /*#__PURE__*/React.createElement(CopyIcon, {
      width: 22,
      height: 22,
      fill: !pairingUri ? Theme.foreground3 : Theme.accent
    }),
    onActionPress: onCopyClipboard ? onCopy : undefined,
    actionDisabled: !pairingUri
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: Theme.background1
    }]
  }, pairingUri ? /*#__PURE__*/React.createElement(QRCode, {
    uri: pairingUri,
    size: QRSize,
    theme: themeState.themeMode
  }) : /*#__PURE__*/React.createElement(ActivityIndicator, {
    style: {
      height: QRSize
    },
    color: Theme.accent
  })));
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    width: '100%'
  }
});
export default QRCodeView;
//# sourceMappingURL=QRCodeView.js.map