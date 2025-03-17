"use client";
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({theme: 0, setTheme: (n: number) => {}});

// @ts-ignore
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(0);
  
  return (

    // @ts-ignore
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
