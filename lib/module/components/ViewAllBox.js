import { StyleSheet, View, Text } from 'react-native';
import { ExplorerCtrl } from '../controllers/ExplorerCtrl';
import useTheme from '../hooks/useTheme';
import Touchable from './Touchable';
import { WALLET_HEIGHT, WALLET_WIDTH, WALLET_MARGIN } from './WalletItem';
import WalletImage from './WalletImage';
function ViewAllBox(_ref) {
  let {
    onPress,
    wallets,
    style
  } = _ref;
  const Theme = useTheme();
  const _wallets = wallets.slice(0, 4);
  const _emptyBoxes = Array.from(Array(4 - _wallets.length).keys());
  return /*#__PURE__*/React.createElement(Touchable, {
    onPress: onPress,
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.icons, {
      borderColor: Theme.overlayThin
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, _wallets.map(wallet => /*#__PURE__*/React.createElement(WalletImage, {
    key: wallet.id,
    size: "xs",
    url: ExplorerCtrl.getWalletImageUrl(wallet.image_id),
    style: styles.icon
  })), _emptyBoxes.map((_, i) => /*#__PURE__*/React.createElement(WalletImage, {
    key: i,
    size: "xs",
    style: styles.icon
  })))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, {
      color: Theme.foreground1
    }],
    numberOfLines: 1
  }, "View All")));
}
const styles = StyleSheet.create({
  container: {
    width: WALLET_WIDTH,
    height: WALLET_HEIGHT,
    alignItems: 'center',
    marginVertical: WALLET_MARGIN
  },
  icons: {
    height: 60,
    width: 60,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    margin: 1
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 5,
    maxWidth: 100,
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center'
  }
});
export default ViewAllBox;
//# sourceMappingURL=ViewAllBox.js.map