/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export const useWillUnmount = (callback: () => void = () => null, dependancies: any[] = []) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, dependancies);
};
