import { ReactElement } from 'react';
import { trafficLightColor } from 'utils/trafficLightColor';

export type TrafficLightPropType = {
  value: number;
  min: number;
  max: number;
};
export const TrafficLight = ({ value, min, max }: TrafficLightPropType): ReactElement => {
  return <div className="h-4 w-4 rounded" style={{ background: trafficLightColor(value, min, max) }}></div>;
};
