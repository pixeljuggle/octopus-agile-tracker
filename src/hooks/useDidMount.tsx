/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

export const useDidMount = (callback: () => void = () => null, dependancies: any[] = []) => {
  const hasMounted: any = useRef<boolean>(false);
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    callback();
    return () => {
      hasMounted.current = false;
    };
  }, dependancies);
};
