import React, {createContext, useContext} from 'react';
import {useAuthStore} from '@app/store/authStore';

type AuthContextType = {
  isLoading: boolean;
  userToken: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  signUp: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const userToken = useAuthStore(s => s.userToken);
  const isHydrated = useAuthStore(s => s.isHydrated);
  const signIn = useAuthStore(s => s.signIn);
  const signOut = useAuthStore(s => s.signOut);
  const signUp = useAuthStore(s => s.signUp);

  // Fallback to avoid being stuck on loading if persistence hydration doesn't trigger
  React.useEffect(() => {
    if (!isHydrated) {
      const id = setTimeout(() => {
        if (!useAuthStore.getState().isHydrated) {
          useAuthStore.getState().setHydrated(true);
        }
      }, 0);
      return () => clearTimeout(id);
    }
  }, [isHydrated]);

  const authContext = {
    isLoading: !isHydrated,
    userToken,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
