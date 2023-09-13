import { useRef } from 'react';
import { Animated, Image as NativeImage } from 'react-native';
import { isIOS } from '../constants/Platform';
function Image(_ref) {
  let {
    source,
    style
  } = _ref;
  const opacity = useRef(new Animated.Value(0));

  // Fade in image on load for iOS. Android does this by default.
  const onLoadEnd = () => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };
  return isIOS ? /*#__PURE__*/React.createElement(Animated.Image, {
    source: {
      uri: source
    },
    onLoadEnd: onLoadEnd,
    style: [{
      opacity: opacity.current
    }, style]
  }) : /*#__PURE__*/React.createElement(NativeImage, {
    source: {
      uri: source
    },
    style: style
  });
}
export default Image;
//# sourceMappingURL=Image.js.map