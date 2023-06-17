import { useRef, useEffect } from 'react';

export function usePolling(callback: (...args: unknown[]) => void | Promise<unknown>, interval: number) {
  const _ismounted: React.MutableRefObject<null | boolean> = useRef(null);
  const _polling: React.MutableRefObject<null | boolean> = useRef(null);
  const timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null);

  const start = async (...args: unknown[]) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    _polling.current = true;

    await callback(...args);

    if (_ismounted.current && _polling.current) {
      timeoutRef.current = setTimeout(() => start(), interval);
    }
  };

  const stop = async (callback?: () => void | Promise<unknown>) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    _polling.current = false;

    if (typeof callback === 'function') {
      await callback();
    }
  };

  useEffect(() => {
    _ismounted.current = true;
    _polling.current = false;
    return () => {
      stop();
      _ismounted.current = false;
    };
  }, []);

  return [start, stop];
}
