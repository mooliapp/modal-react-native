import { proxy } from 'valtio';
import { ClientCtrl } from './ClientCtrl';

// -- initial state ------------------------------------------------ //
const state = proxy({
  address: undefined,
  isConnected: false
});

// -- controller --------------------------------------------------- //
export const AccountCtrl = {
  state,
  async getAccount() {
    const provider = ClientCtrl.state.provider;
    const accounts = await (provider === null || provider === void 0 ? void 0 : provider.request({
      method: 'eth_accounts'
    }));
    if (accounts) {
      state.address = accounts[0];
      state.isConnected = true;
    }
  },
  setAddress(address) {
    state.address = address;
  },
  setIsConnected(isConnected) {
    state.isConnected = isConnected;
  },
  resetAccount() {
    state.address = undefined;
    state.isConnected = false;
  }
};
//# sourceMappingURL=AccountCtrl.js.map