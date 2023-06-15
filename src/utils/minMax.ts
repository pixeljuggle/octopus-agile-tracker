import { UnknownObject } from 'types';

export const minMax = (array: UnknownObject[], key: string) => {
  const numbers = array.map((e) => e[key]);
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);

  return { min, max };
};
