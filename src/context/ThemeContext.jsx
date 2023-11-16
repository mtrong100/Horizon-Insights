import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = (props) => {
  const storedDarkMode = JSON.parse(localStorage.getItem("dark"));
  const [isDarkMode, setIsDarkMode] = useState(storedDarkMode || false);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme} {...props}></ThemeContext.Provider>
  );
};
