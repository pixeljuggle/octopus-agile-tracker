import { useCallback } from 'react';
export const useVibrate = () => {
  const vibrate = useCallback((pattern: number | number[] = 100) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  //  navigator.vibrate = navigator.vibrate || navigator?.webkitVibrate || navigator?.mozVibrate || navigator?.msVibrate;
  return vibrate;
};
