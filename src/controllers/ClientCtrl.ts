import { proxy, ref } from 'valtio';

import type { ClientCtrlState } from '../types/controllerTypes';

// -- initial state ------------------------------------------------ //
const state = proxy<ClientCtrlState>({
  initialized: false,
  provider: undefined,
  session: undefined,
});

// -- controller -------------------------------------------------- //
export const ClientCtrl = {
  state,

  setProvider(provider: ClientCtrlState['provider']) {
    if (!state.initialized && provider) {
      state.provider = ref(provider);
    }
  },

  setInitialized(initialized: ClientCtrlState['initialized']) {
    state.initialized = initialized;
  },

  setSession(session: ClientCtrlState['session']) {
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
  },
};
