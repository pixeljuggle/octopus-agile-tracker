/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useRef, useState } from 'react';

export const useStateRef = (initial: unknown): [any, React.Dispatch<any>, RefObject<any>] => {
  const [state, setState] = useState(initial);
  const ref: React.MutableRefObject<unknown> = useRef(initial);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return [state, setState, ref];
};
