import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSnapshot } from 'valtio';
import useTheme from '../hooks/useTheme';
import Backward from '../assets/Backward';
import { RouterCtrl } from '../controllers/RouterCtrl';
import Touchable from './Touchable';
function ModalHeader(_ref) {
  let {
    title,
    onActionPress,
    actionIcon,
    actionDisabled,
    shadow,
    children
  } = _ref;
  const Theme = useTheme();
  const {
    history
  } = useSnapshot(RouterCtrl.state);
  const [showBack, setShowBack] = useState(false);
  useEffect(() => {
    setShowBack(history.length > 1);
  }, [history]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: Theme.background1
    }, shadow && StyleSheet.flatten([styles.shadow, {
      shadowColor: Theme.background1
    }])]
  }, showBack ? /*#__PURE__*/React.createElement(Touchable, {
    style: styles.button,
    onPress: RouterCtrl.goBack,
    disabled: actionDisabled,
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }, /*#__PURE__*/React.createElement(Backward, {
    height: 18,
    width: 10,
    fill: Theme.accent
  })) : /*#__PURE__*/React.createElement(View, {
    style: styles.button
  }), children, title && /*#__PURE__*/React.createElement(Text, {
    style: [styles.title, {
      color: Theme.foreground1
    }]
  }, title), actionIcon && onActionPress ? /*#__PURE__*/React.createElement(Touchable, {
    style: styles.button,
    onPress: onActionPress,
    disabled: actionDisabled,
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }, actionIcon) : /*#__PURE__*/React.createElement(View, {
    style: styles.button
  }));
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 56
  },
  shadow: {
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 6
        }
      }
    })
  },
  button: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24
  }
});
export default ModalHeader;
//# sourceMappingURL=ModalHeader.js.map