import { TrafficLightRate } from 'components';
import { ReactElement } from 'react';

export type RatesMinMaxPropType = { min: number; max: number; avg: number };
export const RatesMinMax = ({ min, max, avg }: RatesMinMaxPropType): ReactElement => {
  return (
    <>
      {[
        { label: 'MIN', value: min },
        { label: 'MAX', value: max },
        { label: 'AVG', value: avg },
      ].map((e, i) => (
        <div key={i} className=" flex w-full flex-row flex-nowrap content-center justify-between px-4 py-2 text-sm text-gray-300 ">
          <p className="font-bold text-slate-400">{e.label}</p>
          <TrafficLightRate value={e.value} min={min} max={max} />
        </div>
      ))}
    </>
  );
};
