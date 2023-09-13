import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSnapshot } from 'valtio';
import WalletItem, { WALLET_FULL_HEIGHT } from '../components/WalletItem';
import ViewAllBox from '../components/ViewAllBox';
import QRIcon from '../assets/QRCode';
import ModalHeader from '../components/ModalHeader';
import { RouterCtrl } from '../controllers/RouterCtrl';
import { OptionsCtrl } from '../controllers/OptionsCtrl';
import { WcConnectionCtrl } from '../controllers/WcConnectionCtrl';
import { ConfigCtrl } from '../controllers/ConfigCtrl';
import useTheme from '../hooks/useTheme';
import { DataUtil } from '../utils/DataUtil';
function InitialExplorer(_ref) {
  let {
    isPortrait
  } = _ref;
  const Theme = useTheme();
  const {
    isDataLoaded
  } = useSnapshot(OptionsCtrl.state);
  const {
    pairingUri
  } = useSnapshot(WcConnectionCtrl.state);
  const {
    explorerExcludedWalletIds
  } = useSnapshot(ConfigCtrl.state);
  const wallets = DataUtil.getInitialWallets();
  const recentWallet = DataUtil.getRecentWallet();
  const loading = !isDataLoaded || !pairingUri;
  const viewHeight = isPortrait ? WALLET_FULL_HEIGHT * 2 : WALLET_FULL_HEIGHT;
  const showViewAllButton = wallets.length > 8 || explorerExcludedWalletIds !== 'ALL';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ModalHeader, {
    title: "Connect your wallet",
    onActionPress: () => RouterCtrl.push('Qrcode'),
    actionIcon: /*#__PURE__*/React.createElement(QRIcon, {
      width: 22,
      height: 22,
      fill: Theme.accent
    })
  }), loading ? /*#__PURE__*/React.createElement(ActivityIndicator, {
    style: {
      height: viewHeight
    },
    color: Theme.accent
  }) : /*#__PURE__*/React.createElement(View, {
    style: [styles.explorerContainer, {
      height: viewHeight,
      backgroundColor: Theme.background1
    }]
  }, wallets.slice(0, showViewAllButton ? 7 : 8).map(item => /*#__PURE__*/React.createElement(WalletItem, {
    walletInfo: item,
    key: item.id,
    isRecent: item.id === (recentWallet === null || recentWallet === void 0 ? void 0 : recentWallet.id),
    currentWCURI: pairingUri,
    style: isPortrait ? styles.portraitItem : styles.landscapeItem
  })), showViewAllButton && /*#__PURE__*/React.createElement(ViewAllBox, {
    onPress: () => RouterCtrl.push('WalletExplorer'),
    wallets: wallets.slice(-4),
    style: isPortrait ? styles.portraitItem : styles.landscapeItem
  })));
}
const styles = StyleSheet.create({
  explorerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  portraitItem: {
    width: '25%'
  },
  landscapeItem: {
    width: '12.5%'
  }
});
export default InitialExplorer;
//# sourceMappingURL=InitialExplorer.js.map