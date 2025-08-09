import {storage as mmkv} from '@app/storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

export type AuthStoreState = {
  isHydrated: boolean;
  userToken: string | null;
  setHydrated: (value: boolean) => void;
  signIn: (token: string) => void;
  signOut: () => void;
  signUp: (token: string) => void;
};

// MMKV adapter for Zustand persist
const mmkvStorage = {
  getItem: (name: string): string | null => {
    try {
      return mmkv.getString(name) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    mmkv.set(name, value);
  },
  removeItem: (name: string): void => {
    mmkv.delete(name);
  },
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    set => ({
      isHydrated: false,
      userToken: null,
      setHydrated: (value: boolean) => set({isHydrated: value}),
      signIn: (token: string) => {
        // Keep a mirror token for compatibility if needed
        mmkv.set('userToken', token);
        set({userToken: token});
      },
      signOut: () => {
        mmkv.delete('userToken');
        set({userToken: null});
        // Clear user profile if available
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const {useUserStore} = require('./userStore');
          useUserStore.getState().clearUser();
        } catch {}
      },
      signUp: (token: string) => {
        mmkv.set('userToken', token);
        set({userToken: token});
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({userToken: state.userToken}),
      onRehydrateStorage: () => (state, error) => {
        // Mark store as hydrated after persistence rehydrates
        // If error occurs, still mark hydrated to avoid blocking UI
        useAuthStore.setState({isHydrated: true});
      },
    },
  ),
);
