function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useOrientation } from '../hooks/useOrientation';
import QRCodeView from '../views/QRCodeView';
import ViewAllExplorer from '../views/ViewAllExplorer';
import { RouterCtrl } from '../controllers/RouterCtrl';
import InitialExplorer from '../views/InitialExplorer';
import ConnectingView from '../views/ConnectingView';
import useTheme from '../hooks/useTheme';
import { StyleSheet, View } from 'react-native';
export function ModalRouter(props) {
  const routerState = useSnapshot(RouterCtrl.state);
  const Theme = useTheme();
  const {
    height,
    width,
    isPortrait
  } = useOrientation();
  const ViewComponent = useMemo(() => {
    switch (routerState.view) {
      case 'ConnectWallet':
        return InitialExplorer;
      case 'WalletExplorer':
        return ViewAllExplorer;
      case 'Qrcode':
        return QRCodeView;
      case 'Connecting':
        return ConnectingView;
      default:
        return InitialExplorer;
    }
  }, [routerState.view]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.wrapper, {
      backgroundColor: Theme.background1
    }]
  }, /*#__PURE__*/React.createElement(ViewComponent, _extends({
    windowHeight: height,
    windowWidth: width,
    isPortrait: isPortrait
  }, props)));
}
const styles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
});
//# sourceMappingURL=ModalRouter.js.map