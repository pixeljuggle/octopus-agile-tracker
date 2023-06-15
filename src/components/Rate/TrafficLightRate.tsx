import { Rate } from 'components/Rate/Rate';
import { TrafficLight } from 'components/TrafficLight/TrafficLight';
import { ReactElement } from 'react';

export type TrafficLightRatePropType = {
  value: number;
  min: number;
  max: number;
};
export const TrafficLightRate = ({ value, min, max }: TrafficLightRatePropType): ReactElement => {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-end gap-3">
      <Rate value={value} />
      <TrafficLight value={value} min={min} max={max} />
    </div>
  );
};
