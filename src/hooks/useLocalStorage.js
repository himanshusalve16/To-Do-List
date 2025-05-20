import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get stored value from localStorage or use initialValue
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  // State to store our value
  const [value, setValue] = useState(getStoredValue);

  // Update localStorage when the state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
