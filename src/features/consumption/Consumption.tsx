import { SimpleGraph } from 'components';
import { CalendarIcon } from 'components/Icons/CalendarIcon';
import { ChevronsLeft } from 'components/Icons/ChevronsLeft';
import { ChevronsRight } from 'components/Icons/ChevronsRight';
import dayjs from 'dayjs';
import { ConsumptionTable } from 'features/consumption/components/ConsumptionTable';
import { useSettings } from 'features/settings';
import { useConsumption, GetConsumptionParamTypes, GetRatesParamTypes } from 'hooks/useConsumption';
import { useCallback, useLayoutEffect, useState } from 'react';
import { UnknownObject } from 'types';
import { minMax } from 'utils';

export const Consumption = () => {
  const { obus } = useSettings();
  if (Object.values(obus).some((e) => !e)) {
    return (
      <div className="my-6 rounded border border-amber-500 px-3 py-2 font-semibold text-amber-500">API Key and Meter Point required for consumption data</div>
    );
  }

  const { consumption, getConsumption, getDaily, getRates } = useConsumption();
  const [day, setDay] = useState(0);

  const cols = [
    {
      path: 'date',
      label: 'Date',
      content: (row: UnknownObject, i: number) => (
        <span className="flex items-center gap-2">
          {dayjs(row.date).format('D MMMM')}
          {i === day ? <CalendarIcon className=" h-4 w-4" /> : null}
        </span>
      ),
    },
    {
      path: 'consumption',
      label: 'Consumption',
      thClassName: 'flex flex-row flex-nowrap items-center justify-end gap-3',
      className: 'flex flex-row flex-nowrap items-center justify-end gap-3',
      content: (row: UnknownObject) => `${row.consumption} kW  £${row.cost}`,
    },
  ];

  const filterConsumption = useCallback(() => {
    const dayInMs = 86400000;
    const start = getDaily().at(day)?.date ?? 0;
    const end = new Date(start + dayInMs).getTime();

    return consumption.filter((e: UnknownObject) => new Date(e.interval_start).getTime() >= start && new Date(e.interval_end).getTime() <= end);
  }, [consumption, day]);

  useLayoutEffect(() => {
    const daysToFetch = 10;
    const now = new Date();
    const start = new Date(new Date().setDate(now.getDate() - daysToFetch)).toISOString().split('T')[0];
    const end = new Date(new Date().setDate(now.getDate() - 1)).toISOString().split('T')[0];

    const consumptionOptions: GetConsumptionParamTypes = { page_size: 4322, period_from: `${start}T00:00:00`, period_to: `${end}T23:30:00` };
    getConsumption(consumptionOptions);
    const ratesOptions: GetRatesParamTypes = { page_size: 4322, period_from: `${start}T00:00:00`, period_to: `${end}T23:30:00` };
    getRates(ratesOptions);
  }, []);

  return (
    <div className="" id="content">
      {consumption.length ? (
        <div id="dateNav" className="flex gap-2">
          <button
            className=" flex h-7 w-7 items-center justify-center rounded align-middle text-electric-violet-10 hover:bg-electric-violet-900 disabled:opacity-20"
            disabled={day === getDaily().length - 1}
            onClick={() => setDay((prev) => prev + 1)}
          >
            <ChevronsLeft className="h-4 w-4 text-electric-violet-10" />
          </button>
          <span className="flex items-center gap-2  rounded text-sm text-electric-violet-10">
            <CalendarIcon className=" h-4 w-4" />
            <p>{dayjs(getDaily()[day]?.date).format('D MMMM')}</p>
          </span>
          <button
            className=" flex h-7 w-7 items-center justify-center rounded align-middle text-electric-violet-10 hover:bg-electric-violet-900 disabled:opacity-20"
            disabled={day === 0}
            onClick={() => setDay((prev) => prev - 1)}
          >
            <ChevronsRight className="h-4 w-4 text-electric-violet-10" />
          </button>
        </div>
      ) : null}

      <SimpleGraph data={filterConsumption()} unit="kW" dataKey="consumption" {...minMax(filterConsumption(), 'consumption')} />
      {Array.isArray(consumption) && consumption.length ? (
        <>
          <ConsumptionTable cols={cols} data={getDaily()} />
        </>
      ) : (
        <div className="my-6 rounded border border-amber-500 px-3 py-2 font-semibold text-amber-500">No Data</div>
      )}
    </div>
  );
};
