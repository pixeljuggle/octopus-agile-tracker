import { ReactElement } from 'react';
import { trafficLightColor } from 'utils/trafficLightColor';

export type TrafficLightPropType = {
  value: number;
  min: number;
  max: number;
};
export const TrafficLight = ({ value, min, max }: TrafficLightPropType): ReactElement => {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`absolute inline-flex h-full w-full rounded-full  opacity-75 ${value === min || value === max ? 'animate-ping' : ''}`}
        style={{ background: trafficLightColor(value, min, max) }}
      />
      <span className="relative inline-flex h-3 w-3 rounded-full " style={{ background: trafficLightColor(value, min, max) }} />
    </span>
  );
};
