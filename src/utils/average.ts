import { UnknownObject } from 'types';

export const average = (array: UnknownObject[], key: string) => {
  const numbers = array.map((e) => e[key]);
  const avg: number = numbers.reduce((p, c) => p + c, 0) / numbers.length;

  return avg;
};
