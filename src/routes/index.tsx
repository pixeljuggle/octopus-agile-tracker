import { Header, TrafficLightRate } from 'components';
import dayjs from 'dayjs';
import { RatesMinMax, RatesTable, useRates } from 'features/rates';
import { UnknownObject } from 'types';

export const App = () => {
  const { rates, getRates, min, max, avg } = useRates();
  const cols = [
    {
      path: 'valid_from',
      label: 'Date / Time',
      content: (row: UnknownObject) => dayjs(row.valid_from).format('D MMM HH:mm'),
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

  return (
    <div className="flex h-screen w-screen flex-col items-center p-8 font-poppins transition-colors">
      <div className="w-full max-w-[500px] ">
        <div className="px-4">
          <Header />

          <button className=" rounded  bg-heliotrope-500 px-3 py-2   font-semibold text-slate-800 hover:bg-heliotrope-400" onClick={() => getRates()}>
            Get Data
          </button>
        </div>
        <div className="my-4">
          <RatesMinMax min={min} max={max} avg={avg} />
        </div>
        <RatesTable cols={cols} rates={rates} />
      </div>
    </div>
  );
};
