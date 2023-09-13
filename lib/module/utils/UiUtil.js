import { LayoutAnimation } from 'react-native';
export const UiUtil = {
  layoutAnimation() {
    return LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
  },
  getWalletName(name) {
    let short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return short ? name.split(' ')[0] : name;
  }
};
//# sourceMappingURL=UiUtil.js.map