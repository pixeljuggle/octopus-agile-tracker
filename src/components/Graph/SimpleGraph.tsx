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
    <div ref={ref} className="w-full">
      <LineChart width={rect.width} height={200} data={data}>
        <YAxis range={[10, 40]} domain={[Math.floor(min), Math.ceil(max)]} hide={true} axisLine={false} />
        <XAxis dataKey="timestamp" hide={true} axisLine={false} type="number" domain={[data.at(0)?.timestamp, data.at(-1)?.timestamp]} />
        <Tooltip
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

// stroke="#94a3b8"
