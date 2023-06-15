import { ReactElement } from 'react';

export type RatePropType = {
  value: number;
};
export const Rate = ({ value }: RatePropType): ReactElement => {
  return <>{`${Math.round(value * 100) / 100} p/kWh`}</>;
};
