import { Text, StyleSheet } from 'react-native';
import { ExplorerUtil } from '../utils/ExplorerUtil';
import useTheme from '../hooks/useTheme';
import { ExplorerCtrl } from '../controllers/ExplorerCtrl';
import { RouterCtrl } from '../controllers/RouterCtrl';
import { DataUtil } from '../utils/DataUtil';
import { UiUtil } from '../utils/UiUtil';
import Touchable from './Touchable';
import WalletImage from './WalletImage';
export const WALLET_MARGIN = 8;
export const WALLET_WIDTH = 80;
export const WALLET_HEIGHT = 98;
export const WALLET_FULL_HEIGHT = WALLET_HEIGHT + WALLET_MARGIN * 2;
function WalletItem(_ref) {
  let {
    currentWCURI,
    walletInfo,
    style,
    isRecent
  } = _ref;
  const Theme = useTheme();
  const imageUrl = ExplorerCtrl.getWalletImageUrl(walletInfo.image_id);
  const onPress = () => {
    if (currentWCURI) {
      DataUtil.setRecentWallet(walletInfo);
      ExplorerUtil.navigateDeepLink(walletInfo.mobile.universal, walletInfo.mobile.native, currentWCURI);
      RouterCtrl.push('Connecting', {
        wallet: walletInfo
      });
    }
  };
  return /*#__PURE__*/React.createElement(Touchable, {
    onPress: onPress,
    key: walletInfo.id,
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(WalletImage, {
    size: "md",
    url: imageUrl
  }), /*#__PURE__*/React.createElement(Text, {
    style: [styles.name, {
      color: Theme.foreground1
    }],
    numberOfLines: 1
  }, UiUtil.getWalletName(walletInfo.name, true)), (isRecent || walletInfo.isInstalled) && /*#__PURE__*/React.createElement(Text, {
    style: [styles.status, {
      color: Theme.foreground3
    }]
  }, isRecent ? 'RECENT' : 'INSTALLED'));
}
const styles = StyleSheet.create({
  container: {
    width: WALLET_WIDTH,
    height: WALLET_HEIGHT,
    alignItems: 'center',
    marginVertical: WALLET_MARGIN
  },
  name: {
    marginTop: 5,
    maxWidth: 100,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2
  },
  status: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center'
  }
});
export default WalletItem;
//# sourceMappingURL=WalletItem.js.map