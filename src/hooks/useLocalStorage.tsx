import { useEffect, useLayoutEffect, useState } from 'react';

export function useLocalStorage(key: string, initialValue: object) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? { ...initialValue, ...JSON.parse(item) } : initialValue;
    } catch (error) {
      console.log(error);
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = (value: object | ((current: object) => void)) => {
    setStoredValue((current: object) => (typeof value === 'function' ? value(current) : value));
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  // useLayoutEffect(() => {
  //   window.localStorage.setItem(key, JSON.stringify(storedValue));
  // }, []);

  return [storedValue, setValue, removeValue];
}
