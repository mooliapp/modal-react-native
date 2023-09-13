import { useEffect } from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';
import ModalHeader from '../components/ModalHeader';
import CopyIcon from '../assets/CopyLarge';
import useTheme from '../hooks/useTheme';
import { ToastCtrl } from '../controllers/ToastCtrl';
import { WcConnectionCtrl } from '../controllers/WcConnectionCtrl';
import Text from '../components/Text';
import { ExplorerUtil } from '../utils/ExplorerUtil';
import { RouterCtrl } from '../controllers/RouterCtrl';
import Touchable from '../components/Touchable';
import { UiUtil } from '../utils/UiUtil';
import RetryIcon from '../assets/Retry';
import WalletImage from '../components/WalletImage';
import WalletLoadingThumbnail from '../components/WalletLoadingThumbnail';
import Chevron from '../assets/Chevron';
function ConnectingView(_ref) {
  var _data$wallet, _data$wallet2, _data$wallet3, _data$wallet4, _data$wallet5;
  let {
    onCopyClipboard
  } = _ref;
  const Theme = useTheme();
  const {
    pairingUri,
    pairingError
  } = useSnapshot(WcConnectionCtrl.state);
  const {
    data
  } = useSnapshot(RouterCtrl.state);
  const walletName = UiUtil.getWalletName((data === null || data === void 0 ? void 0 : (_data$wallet = data.wallet) === null || _data$wallet === void 0 ? void 0 : _data$wallet.name) ?? 'Wallet', true);
  const imageUrl = ExplorerUtil.getWalletImageUrl(data === null || data === void 0 ? void 0 : (_data$wallet2 = data.wallet) === null || _data$wallet2 === void 0 ? void 0 : _data$wallet2.image_id);
  const alternateLink = data !== null && data !== void 0 && (_data$wallet3 = data.wallet) !== null && _data$wallet3 !== void 0 && _data$wallet3.mobile.native && data.wallet.mobile.universal ? data.wallet.mobile.universal : undefined;
  const storeLink = Platform.select({
    ios: data === null || data === void 0 ? void 0 : (_data$wallet4 = data.wallet) === null || _data$wallet4 === void 0 ? void 0 : _data$wallet4.app.ios,
    android: data === null || data === void 0 ? void 0 : (_data$wallet5 = data.wallet) === null || _data$wallet5 === void 0 ? void 0 : _data$wallet5.app.android
  });
  const storeCaption = Platform.select({
    ios: 'App Store',
    android: 'Play Store'
  });
  const onCopy = async () => {
    if (onCopyClipboard) {
      onCopyClipboard(pairingUri);
      ToastCtrl.openToast('Link copied', 'success');
    }
  };
  const onRetry = () => {
    var _data$wallet6, _data$wallet7;
    WcConnectionCtrl.setPairingError(null);
    ExplorerUtil.navigateDeepLink(data === null || data === void 0 ? void 0 : (_data$wallet6 = data.wallet) === null || _data$wallet6 === void 0 ? void 0 : _data$wallet6.mobile.universal, data === null || data === void 0 ? void 0 : (_data$wallet7 = data.wallet) === null || _data$wallet7 === void 0 ? void 0 : _data$wallet7.mobile.native, pairingUri);
  };
  const onAlternativePress = () => {
    if (alternateLink) {
      WcConnectionCtrl.setPairingError(null);
      ExplorerUtil.navigateDeepLink(alternateLink, '', pairingUri);
    }
  };
  useEffect(() => {
    WcConnectionCtrl.setPairingError(null);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ModalHeader, {
    title: walletName,
    actionIcon: /*#__PURE__*/React.createElement(CopyIcon, {
      width: 22,
      height: 22,
      fill: Theme.accent
    }),
    onActionPress: onCopyClipboard ? onCopy : undefined
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.walletContainer, {
      backgroundColor: Theme.background1
    }]
  }, /*#__PURE__*/React.createElement(WalletLoadingThumbnail, {
    showError: !!pairingError
  }, /*#__PURE__*/React.createElement(WalletImage, {
    url: imageUrl,
    size: "lg"
  })), /*#__PURE__*/React.createElement(Text, {
    style: [styles.continueText, {
      color: pairingError ? Theme.negative : Theme.foreground1
    }]
  }, pairingError ? 'Connection declined' : `Continue in ${walletName}...`)), /*#__PURE__*/React.createElement(View, {
    style: [styles.footer, {
      backgroundColor: Theme.background2
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.upperFooter, {
      borderColor: Theme.foreground3
    }]
  }, /*#__PURE__*/React.createElement(Touchable, {
    style: [styles.retryButton, {
      backgroundColor: Theme.accent
    }],
    onPress: onRetry
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, "Retry"), /*#__PURE__*/React.createElement(RetryIcon, {
    style: styles.retryIcon
  })), alternateLink && /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, styles.alternateText, {
      color: Theme.foreground2
    }]
  }, "Still doesn't work?", ' ', /*#__PURE__*/React.createElement(Text, {
    style: {
      color: Theme.accent
    },
    onPress: onAlternativePress
  }, "Try this alternate link"))), storeLink && /*#__PURE__*/React.createElement(View, {
    style: styles.lowerFooter
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(WalletImage, {
    url: imageUrl,
    size: "sm"
  }), /*#__PURE__*/React.createElement(Text, {
    style: [styles.getText, {
      color: Theme.foreground1
    }]
  }, `Get ${walletName}`)), /*#__PURE__*/React.createElement(Touchable, {
    style: styles.row,
    onPress: () => Linking.openURL(storeLink)
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.storeText, {
      color: Theme.foreground2
    }]
  }, storeCaption), /*#__PURE__*/React.createElement(Chevron, {
    fill: Theme.foreground2,
    width: 6,
    style: styles.storeIcon
  })))));
}
const styles = StyleSheet.create({
  walletContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  image: {
    height: 96,
    width: 96,
    borderRadius: 28
  },
  continueText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600'
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  retryIcon: {
    marginLeft: 4
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  alternateText: {
    marginTop: 16
  },
  getText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  storeText: {
    fontSize: 14,
    fontWeight: '600'
  },
  footer: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  upperFooter: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  lowerFooter: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  storeIcon: {
    marginLeft: 4
  }
});
export default ConnectingView;
//# sourceMappingURL=ConnectingView.js.map