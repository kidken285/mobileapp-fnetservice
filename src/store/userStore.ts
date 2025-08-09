import {storage as mmkv} from '@app/storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {helper} from '@app/common';
import {useAuthStore} from './authStore';

export type UserProfile = {
  id: string;
  username: string;
  fullName: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other' | string;
  roles?: string[];
};

type UserStoreState = {
  isHydrated: boolean;
  isFetching: boolean;
  user: UserProfile | null;
  error?: string | null;
  setHydrated: (value: boolean) => void;
  setUser: (user: UserProfile | null) => void;
  clearUser: () => void;
  loadUserProfile: (token?: string) => Promise<void>;
};

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

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      isHydrated: false,
      isFetching: false,
      user: null,
      error: null,
      setHydrated: (value: boolean) => set({isHydrated: value}),
      setUser: (user: UserProfile | null) => set({user}),
      clearUser: () => set({user: null, error: null}),
      loadUserProfile: async (token?: string) => {
        const effectiveToken = token ?? useAuthStore.getState().userToken;
        if (!effectiveToken) {
          set({user: null, error: 'NO_TOKEN'});
          return;
        }
        try {
          set({isFetching: true, error: null});
          // TODO: Replace this mock with real API call
          await helper.sleep(400);
          const mockUser: UserProfile = {
            id: 'u-1',
            username: 'Bon',
            fullName: 'Huỳnh Dương Hoàng',
            phone: '0123456789',
            gender: 'male',
            roles: ['member'],
          };
          set({user: mockUser});
        } catch (e) {
          set({error: 'LOAD_USER_FAILED'});
        } finally {
          set({isFetching: false});
        }
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({user: state.user}),
      onRehydrateStorage: () => () => {
        useUserStore.setState({isHydrated: true});
      },
    },
  ),
);
