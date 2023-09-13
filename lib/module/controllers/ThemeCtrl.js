import { Appearance } from 'react-native';
import { proxy } from 'valtio';
// -- initial state ------------------------------------------------ //
const state = proxy({
  themeMode: Appearance.getColorScheme() ?? 'light',
  accentColor: undefined
});

// -- controller --------------------------------------------------- //
export const ThemeCtrl = {
  state,
  setThemeMode(themeMode) {
    state.themeMode = themeMode ?? Appearance.getColorScheme() ?? 'light';
  },
  setAccentColor(accentColor) {
    state.accentColor = accentColor;
  }
};
//# sourceMappingURL=ThemeCtrl.js.map