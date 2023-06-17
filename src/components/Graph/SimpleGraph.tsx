import { ChartTooltip } from 'components/Graph/ChartTooltip';
import { useMeasure } from 'hooks/useMeasure';
import { usePolling } from 'hooks/usePolling';
import { useEffect, useState } from 'react';
import { Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';
import { UnknownObject } from 'types';

export type SimpleGraphPropTypes = {
  data: UnknownObject[];
  min: number;
  max: number;
};
export const SimpleGraph = ({ data, min, max }: SimpleGraphPropTypes) => {
  const [ref, rect] = useMeasure();
  const [now, setNow] = useState(new Date().getTime());

  const [startPoll, stopPoll] = usePolling(() => setNow(new Date().getTime()), 60000);

  useEffect(() => {
    startPoll();
    return () => {
      stopPoll();
    };
  }, []);

  return (
    <div ref={ref} className="w-full text-[0.7rem] text-slate-400">
      <LineChart width={rect.width} height={200} data={data}>
        <XAxis dataKey="timestamp" hide={true} axisLine={false} type="number" domain={[data.at(0)?.timestamp, data.at(-1)?.timestamp]} />
        <YAxis domain={[Math.floor(min), Math.ceil(max)]} hide={true} axisLine={false} unit="p" />
        <Tooltip
          position={{ y: 0 }}
          cursor={{ stroke: '#5EEAF4', strokeWidth: 1.5 }}
          contentStyle={{ backgroundColor: '#111827' }}
          itemStyle={{ color: '#818cf8' }}
          content={<ChartTooltip />}
        />
        <ReferenceLine x={now} stroke="#94a3b8" strokeDasharray="3 3" label="" />
        <Line type="stepAfter" dataKey="rate" stroke="#F484FA" strokeWidth={2} dot={false} activeDot={false} />
      </LineChart>
    </div>
  );
};

const Label = (props) => {
  console.log(props);
  return null;
};
// stroke="#94a3b8"
