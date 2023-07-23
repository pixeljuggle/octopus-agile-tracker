/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimpleGraph } from 'components';
import { WaveLoader } from 'components/Spinner/WaveLoader';
import dayjs from 'dayjs';
import { ChargerTable } from 'features/charger/components/ChargerTable';
import { useRates } from 'features/rates/providers/RatesProvider';
import { useSettings } from 'features/settings';
import { useEvCharger } from 'hooks/useEvCharger';
import { useEffect, useLayoutEffect, useState } from 'react';
import { UnknownObject } from 'types';
import { niceTime } from 'utils/niceTime';

export const Charger = () => {
  const { obus } = useSettings();
  if (!obus.apiKey || !obus.mpan || !obus.serial || !obus.charger) {
    return <div className="my-6 rounded border border-amber-500 px-3 py-2 font-semibold text-amber-500">API Key and Meter Point required for charger data</div>;
  }

  const { data: rates } = useRates();

  const [usage, setUsage] = useState<UnknownObject[]>([]);
  const [graphData, setGraphData] = useState<UnknownObject[]>([]);

  const { sessions, loading, getSessions } = useEvCharger();
  const cols = [
    {
      path: 'start',
      label: 'Date',
    },
    {
      path: 'duration',
      label: 'Duration',
    },
    {
      path: 'kiloWattHours',
      label: 'Consumption',
      thClassName: 'flex flex-row flex-nowrap items-center justify-end gap-3',
      className: 'flex flex-row flex-nowrap items-center justify-end gap-3',
      content: (row: UnknownObject) => (
        <span className="flex gap-3">
          <p>{`${(Math.round(row.kiloWattHours * 10) / 10).toFixed(1)} kW`}</p>
          <p className="font-semibold">{`£${row.cost.toFixed(2)}`}</p>
        </span>
      ),
    },
  ];

  const getUsage = (session: UnknownObject) => {
    const startTimestamp = new Date(session.firstEnergyTransferPeriodStarted).getTime();
    const kWm = (session.kiloWattHours / session.actualDurationSeconds) * 60;

    const totalPence = Array(Math.ceil(session.actualDurationSeconds / 60))
      .fill(null)
      .reduce((prev, curr, i) => {
        const timestamp = startTimestamp + i * 60000;
        const rate = rates.find((e) => new Date(e.valid_from).getTime() < timestamp && new Date(e.valid_to).getTime() >= timestamp)?.value_inc_vat ?? 0;

        const price = kWm * rate;

        return prev + price;
      }, 0);

    return Math.ceil(totalPence) / 100;
  };

  const formatData = () => {
    const usage: UnknownObject[] = sessions.map((session) => {
      const start = dayjs(session.firstEnergyTransferPeriodStarted);
      const end = dayjs(session.lastEnergyTransferPeriodEnd);
      const duration = niceTime(session.actualDurationSeconds * 1000);
      return {
        ...session,
        start: start.format('D MMM hh:mm'),
        end: end.format('D MMM hh:mm'),
        kiloWattHours: session.kiloWattHours,
        duration,
        cost: getUsage(session),
        timestamp: new Date(session.firstEnergyTransferPeriodStarted).getTime(),
      };
    });
    const graphData: UnknownObject[] = sessions.reduce((prev: UnknownObject[], session) => {
      const start = {
        date: dayjs(session.firstEnergyTransferPeriodStarted).format('D MMM hh:mm'),
        timestamp: new Date(session.firstEnergyTransferPeriodStarted).getTime(),
        kiloWattHours: Math.round(session.kiloWattHours * 10) / 10,
      };
      const end = {
        date: dayjs(session.lastEnergyTransferPeriodEnd).format('D MMM hh:mm'),
        timestamp: new Date(session.lastEnergyTransferPeriodEnd).getTime(),
        kiloWattHours: 0,
      };
      return [...prev, start, end];
    }, []);

    setUsage(usage.reverse());
    setGraphData(graphData);
    console.log({ usage });
  };

  useLayoutEffect(() => {
    getSessions();
  }, []);

  useEffect(() => {
    formatData();
  }, [sessions]);

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center align-middle" id="loading">
          <WaveLoader className="h-20 w-20 fill-heliotrope-500" />
        </div>
      ) : (
        <div className="" id="content">
          <SimpleGraph data={graphData} unit="kW" dataKey="kiloWattHours" min={0} max={30} />
          {Array.isArray(sessions) && sessions.length ? (
            <>
              <ChargerTable cols={cols} data={usage} />
            </>
          ) : (
            <div className="my-6 rounded border border-amber-500 px-3 py-2 font-semibold text-amber-500">No Data</div>
          )}
        </div>
      )}
    </>
  );
};
