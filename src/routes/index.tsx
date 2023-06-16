import { Header, TrafficLightRate } from 'components';
import { USE_API_KEY } from 'config';
import dayjs from 'dayjs';
import { RatesMinMax, RatesTable, useRates } from 'features/rates';
import { SettingsDialog } from 'features/settings';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useLayoutEffect, useState } from 'react';
import { UnknownObject } from 'types';

export const App = () => {
  const { rates, getRates, min, max, avg } = useRates();
  const { obus } = useSettings();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
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

  useLayoutEffect(() => {
    if (!obus?.apiKey) {
      setSettingsOpen(true);
    }
  }, []);
  return (
    <div className="flex h-screen w-screen flex-col items-center p-8 font-poppins transition-colors">
      <div className="flex h-full w-full max-w-[500px] flex-col flex-nowrap justify-between">
        <div className="" id="content">
          <div className="px-4">
            <Header />
          </div>
          {Array.isArray(rates) && rates.length ? (
            <>
              <div className="my-8">
                <RatesMinMax min={min} max={max} avg={avg} />
              </div>
              <RatesTable cols={cols} rates={rates} />
            </>
          ) : (
            <div className="mx-4 my-6 rounded  border border-amber-500 px-3 py-2 font-semibold text-amber-500">No Data</div>
          )}
        </div>

        <div className="flex gap-4 px-2 py-8" id="footer">
          <button className=" rounded px-2 py-2 text-xs text-heliotrope-500 " onClick={() => getRates()}>
            Refresh Data
          </button>
          {USE_API_KEY ? (
            <>
              <button className="rounded px-3 py-2 text-xs text-heliotrope-500 " onClick={() => setSettingsOpen(true)}>
                Set API Key
              </button>
              <SettingsDialog open={isSettingsOpen} setOpen={setSettingsOpen} onClose={() => getRates()} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
