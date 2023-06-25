import { ArrowDownIcon, ArrowUpIcon, SimpleGraph, TrafficLightRate } from 'components';
import dayjs from 'dayjs';
import { RatesMinMax } from 'features/rates/components/RatesMinMax';
import { RatesTable } from 'features/rates/components/RatesTable';
import { useRates } from 'hooks/useRates';
import { useLayoutEffect } from 'react';
import { UnknownObject } from 'types';

export const Rates = () => {
  const { rates, getRates, min, max, avg } = useRates();

  const renderArrows = (value: number) => {
    if (value === min) {
      return <ArrowDownIcon size={1} width={2.5} className=" text-green-500" />;
    } else if (value === max) {
      return <ArrowUpIcon size={1} width={2.5} className=" text-red-500" />;
    } else {
      return null;
    }
  };
  const cols = [
    {
      path: 'valid_from',
      label: 'Date / Time',
      thClassName: 'w-32 whitespace-nowrap',
      content: (row: UnknownObject) => dayjs(row.valid_from).format('D MMM HH:mm'),
    },
    {
      path: 'valid_from',
      label: '',
      content: (row: UnknownObject) => <span className="flex items-center gap-2">{renderArrows(row.value_inc_vat)}</span>,
    },
    {
      path: 'value_inc_vat',
      label: 'Rate ',
      thClassName: 'flex flex-row flex-nowrap items-center justify-end gap-3',
      content: (row: UnknownObject) => {
        return <TrafficLightRate value={row.value_inc_vat} min={min} max={max} />;
      },
    },
  ];

  useLayoutEffect(() => {
    getRates();
  }, []);

  return (
    <div className="" id="content">
      <SimpleGraph data={rates} unit="p/kWh" dataKey="rate" min={min} max={max} />
      {Array.isArray(rates) && rates.length ? (
        <>
          <div className="my-8">
            <RatesMinMax min={min} max={max} avg={avg} />
          </div>
          <RatesTable cols={cols} rates={rates} />
        </>
      ) : (
        <div className="my-6 rounded border border-amber-500 px-3 py-2 font-semibold text-amber-500">No Data</div>
      )}
    </div>
  );
};
