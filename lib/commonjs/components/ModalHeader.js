"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _Backward = _interopRequireDefault(require("../assets/Backward"));
var _RouterCtrl = require("../controllers/RouterCtrl");
var _Touchable = _interopRequireDefault(require("./Touchable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ModalHeader(_ref) {
  let {
    title,
    onActionPress,
    actionIcon,
    actionDisabled,
    shadow,
    children
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const {
    history
  } = (0, _valtio.useSnapshot)(_RouterCtrl.RouterCtrl.state);
  const [showBack, setShowBack] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setShowBack(history.length > 1);
  }, [history]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: Theme.background1
    }, shadow && _reactNative.StyleSheet.flatten([styles.shadow, {
      shadowColor: Theme.background1
    }])]
  }, showBack ? /*#__PURE__*/React.createElement(_Touchable.default, {
    style: styles.button,
    onPress: _RouterCtrl.RouterCtrl.goBack,
    disabled: actionDisabled,
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }, /*#__PURE__*/React.createElement(_Backward.default, {
    height: 18,
    width: 10,
    fill: Theme.accent
  })) : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.button
  }), children, title && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.title, {
      color: Theme.foreground1
    }]
  }, title), actionIcon && onActionPress ? /*#__PURE__*/React.createElement(_Touchable.default, {
    style: styles.button,
    onPress: onActionPress,
    disabled: actionDisabled,
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }, actionIcon) : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.button
  }));
}
const styles = _reactNative.StyleSheet.create({
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
    ..._reactNative.Platform.select({
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
var _default = ModalHeader;
exports.default = _default;
//# sourceMappingURL=ModalHeader.js.map