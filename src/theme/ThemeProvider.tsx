import React, { createContext, useContext } from 'react';
import colors from './colors';

interface ThemeContextType {
  colors: typeof colors;
}

const ThemeContext = createContext<ThemeContextType>({ colors });

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
}; 