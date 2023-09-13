import { proxy, ref } from 'valtio';
// -- initial state ------------------------------------------------ //
const state = proxy({
  initialized: false,
  provider: undefined,
  session: undefined
});

// -- controller -------------------------------------------------- //
export const ClientCtrl = {
  state,
  setProvider(provider) {
    if (!state.initialized && provider) {
      state.provider = ref(provider);
    }
  },
  setInitialized(initialized) {
    state.initialized = initialized;
  },
  setSession(session) {
    if (session && state.provider) {
      state.session = session;
    }
  },
  provider() {
    return state.provider;
  },
  session() {
    return state.session;
  },
  resetSession() {
    state.session = undefined;
  }
};
//# sourceMappingURL=ClientCtrl.js.map