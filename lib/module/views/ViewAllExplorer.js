import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useSnapshot } from 'valtio';
import WalletItem, { WALLET_FULL_HEIGHT } from '../components/WalletItem';
import ModalHeader from '../components/ModalHeader';
import { ExplorerCtrl } from '../controllers/ExplorerCtrl';
import { OptionsCtrl } from '../controllers/OptionsCtrl';
import { WcConnectionCtrl } from '../controllers/WcConnectionCtrl';
import useTheme from '../hooks/useTheme';
import { ThemeCtrl } from '../controllers/ThemeCtrl';
import SearchBar from '../components/SearchBar';
import { DataUtil } from '../utils/DataUtil';
import Text from '../components/Text';
import { useDebounceCallback } from '../hooks/useDebounceCallback';
function ViewAllExplorer(_ref) {
  let {
    isPortrait,
    windowHeight,
    windowWidth
  } = _ref;
  const Theme = useTheme();
  const {
    isDataLoaded
  } = useSnapshot(OptionsCtrl.state);
  const {
    pairingUri
  } = useSnapshot(WcConnectionCtrl.state);
  const {
    themeMode
  } = useSnapshot(ThemeCtrl.state);
  const {
    wallets
  } = useSnapshot(ExplorerCtrl.state);
  const recentWallet = DataUtil.getRecentWallet();
  const shouldLoadWallets = wallets.listings.length === 0;
  const [walletsLoading, setWalletsLoading] = useState(false);
  const loading = !isDataLoaded || !pairingUri || walletsLoading;
  const [search, setSearch] = useState('');
  const onChangeText = useDebounceCallback({
    callback: setSearch
  });
  useEffect(() => {
    async function getWallets() {
      if (shouldLoadWallets) {
        setWalletsLoading(true);
        await ExplorerCtrl.getWallets();
        setWalletsLoading(false);
      }
    }
    getWallets();
  }, [shouldLoadWallets]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ModalHeader, {
    shadow: true
  }, /*#__PURE__*/React.createElement(SearchBar, {
    onChangeText: onChangeText,
    style: styles.searchbar
  })), loading ? /*#__PURE__*/React.createElement(ActivityIndicator, {
    style: {
      height: Math.round(windowHeight * 0.6)
    },
    color: Theme.accent
  }) : /*#__PURE__*/React.createElement(FlatList, {
    data: DataUtil.getAllWallets({
      search
    }),
    style: {
      height: Math.round(windowHeight * 0.6),
      backgroundColor: Theme.background1
    },
    contentContainerStyle: styles.listContentContainer,
    indicatorStyle: themeMode === 'dark' ? 'white' : 'black',
    showsVerticalScrollIndicator: true,
    numColumns: isPortrait ? 4 : 7,
    fadingEdgeLength: 20,
    ListEmptyComponent: /*#__PURE__*/React.createElement(View, {
      style: [styles.emptyContainer, {
        height: Math.round(windowHeight * 0.6)
      }]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.emptyText, {
        color: Theme.foreground2
      }]
    }, "No results found")),
    key: isPortrait ? 'portrait' : 'landscape',
    getItemLayout: (_data, index) => ({
      length: WALLET_FULL_HEIGHT,
      offset: WALLET_FULL_HEIGHT * index,
      index
    }),
    renderItem: _ref2 => {
      let {
        item
      } = _ref2;
      return /*#__PURE__*/React.createElement(WalletItem, {
        currentWCURI: pairingUri,
        walletInfo: item,
        isRecent: item.id === (recentWallet === null || recentWallet === void 0 ? void 0 : recentWallet.id),
        style: {
          width: isPortrait ? Math.round(windowWidth / 4) : Math.round(windowWidth / 7)
        }
      });
    }
  }));
}
const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 12
  },
  searchbar: {
    marginLeft: 16
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600'
  }
});
export default ViewAllExplorer;
//# sourceMappingURL=ViewAllExplorer.js.map