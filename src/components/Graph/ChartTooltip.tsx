/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnknownObject } from 'types';

export const ChartTooltip = (props: any) => {
  const payload: UnknownObject | null = props?.payload[0]?.payload ?? null;

  if (!payload) return null;

  return (
    <div className=" w-fit select-none rounded border border-electric-violet-700 border-opacity-50 bg-electric-violet-950 bg-opacity-40 px-4 py-3 text-xs text-gray-200 backdrop-blur-sm">
      <p className="py-1">{payload?.date ?? 'N/A'}</p>
      <p>
        <b>{payload[props?.dataKey] ?? 'N/A'}</b> {props.unit}
      </p>
    </div>
  );
};
