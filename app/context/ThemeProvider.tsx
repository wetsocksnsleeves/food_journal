"use client";
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({theme: 0, setTheme: () => {}});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(0);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
