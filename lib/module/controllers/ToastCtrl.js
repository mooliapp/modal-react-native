import { proxy } from 'valtio';
// -- initial state ------------------------------------------------ //
const state = proxy({
  open: false,
  message: '',
  variant: 'success'
});

// -- controller --------------------------------------------------- //
export const ToastCtrl = {
  state,
  openToast(message, variant) {
    state.open = true;
    state.message = message;
    state.variant = variant;
  },
  closeToast() {
    state.open = false;
  }
};
//# sourceMappingURL=ToastCtrl.js.map