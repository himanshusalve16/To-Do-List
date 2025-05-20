import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button 
      onClick={toggleDarkMode} 
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
