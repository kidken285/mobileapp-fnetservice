import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '@app/storage';

const AUTH_TOKEN_KEY = 'userToken';

type AuthContextType = {
  isLoading: boolean;
  userToken: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  signUp: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in when app starts
    bootstrapAsync();
  }, []);

  const bootstrapAsync = () => {
    try {
      const token = storage.getString(AUTH_TOKEN_KEY);
      setUserToken(token ?? null);  
    } catch (e) {
      // Handle error
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const authContext = {
    isLoading,
    userToken,
    signIn: (token: string) => {
      storage.set(AUTH_TOKEN_KEY, token);
      setUserToken(token);
    },
    signOut: () => {
      storage.delete(AUTH_TOKEN_KEY);
      setUserToken(null);
    },
    signUp: (token: string) => {
      storage.set(AUTH_TOKEN_KEY, token);
      setUserToken(token);
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};