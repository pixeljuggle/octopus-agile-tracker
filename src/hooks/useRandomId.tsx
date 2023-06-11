import { useState, useEffect } from 'react';

const randomId = (): string => `learnd-${Math.random().toString(36).slice(2, 11)}-${Math.random().toString(36).slice(2, 11)}`;

export function useRandomId() {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    setUuid(randomId());
  }, []);

  return uuid;
}
