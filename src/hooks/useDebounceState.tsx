/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export const useDebounceState = (defaultValue: any, wait: number, options = { leading: false }) => {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingRef = useRef(true);

  const _clearTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => _clearTimeout(), []);

  const debouncedSetValue = (newValue: any) => {
    _clearTimeout();
    if (leadingRef.current && options.leading) {
      setValue(newValue);
    } else {
      timeoutRef.current = setTimeout(() => {
        leadingRef.current = true;
        setValue(newValue);
      }, wait);
    }
    leadingRef.current = false;
  };

  return [value, debouncedSetValue] as const;
};
