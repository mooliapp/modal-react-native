import { StyleSheet, View } from 'react-native';
import useTheme from '../hooks/useTheme';
import WalletIcon from '../assets/WalletIcon';
import Image from './Image';
const sizeMap = {
  xs: 23,
  sm: 30,
  md: 60,
  lg: 90
};
function WalletImage(_ref) {
  let {
    url,
    size,
    style
  } = _ref;
  const Theme = useTheme();
  const sizeNum = sizeMap[size];
  return url ? /*#__PURE__*/React.createElement(Image, {
    style: [styles.icon, {
      borderColor: Theme.overlayThin,
      height: sizeNum,
      width: sizeNum,
      borderRadius: sizeNum / 3.5
    }, style],
    source: url
  }) : /*#__PURE__*/React.createElement(View, {
    style: [styles.icon, styles.placeholderIcon, {
      backgroundColor: Theme.background2,
      borderColor: Theme.overlayThin,
      height: sizeNum,
      width: sizeNum,
      borderRadius: sizeNum / 3.5
    }, style]
  }, /*#__PURE__*/React.createElement(WalletIcon, {
    height: sizeNum / 2,
    width: sizeNum / 2
  }));
}
const styles = StyleSheet.create({
  icon: {
    borderWidth: 1
  },
  placeholderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1
  }
});
export default WalletImage;
//# sourceMappingURL=WalletImage.js.map