import { Appearance } from 'react-native';
import { proxy } from 'valtio';
import type { ThemeCtrlState } from '../types/controllerTypes';

// -- initial state ------------------------------------------------ //
const state = proxy<ThemeCtrlState>({
  themeMode: Appearance.getColorScheme() ?? 'light',
  themeVariables: undefined,
});

// -- controller --------------------------------------------------- //
export const ThemeCtrl = {
  state,

  setThemeMode(themeMode?: ThemeCtrlState['themeMode'] | null) {
    state.themeMode = themeMode ?? Appearance.getColorScheme() ?? 'light';
  },

  setThemeVariables(themeVariables?: ThemeCtrlState['themeVariables']) {
    state.themeVariables = themeVariables;
  },
};
