import { proxy } from 'valtio';
// -- initial state ------------------------------------------------ //
const state = proxy({
  isDataLoaded: false
});

// -- controller --------------------------------------------------- //
export const OptionsCtrl = {
  state,
  setIsDataLoaded(isDataLoaded) {
    state.isDataLoaded = isDataLoaded;
  }
};
//# sourceMappingURL=OptionsCtrl.js.map