import React from "react";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

const ThemeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle-button ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <span className="w-[40px] h-[40px] flex items-center justify-center border-borderColor border rounded-md">
          <BiSun size={30} />
        </span>
      ) : (
        <span className="w-[40px] h-[40px] flex items-center justify-center border-borderColor border rounded-md">
          <BsMoonFill size={25} />
        </span>
      )}
    </button>
  );
};

export default ThemeButton;
