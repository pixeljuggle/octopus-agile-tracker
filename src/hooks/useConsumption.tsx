/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useRates } from 'features/rates/providers/RatesProvider';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useCallback, useState } from 'react';
import { UnknownObject } from 'types';

export type GetConsumptionParamTypes = {
  period_from?: string;
  period_to?: string;
  page_size?: number;
  mpan?: string;
  serial?: string;
};
export type GetRatesParamTypes = {
  period_from?: string;
  period_to?: string;
  page_size?: number;
};
export const useConsumption = () => {
  const [consumption, setConsumption] = useState([]);
  const [loading, setLoading] = useState(true);

  const rates = useRates();

  const { obus } = useSettings();
  const { apiKey, mpan, serial } = obus;

  const getConsumption = async (options: GetConsumptionParamTypes = { period_from: '', period_to: '', page_size: 96, mpan: '', serial: '' }) => {
    const { period_from = '', period_to = '', page_size = 96 } = options;
    setLoading(true);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // eslint-disable-next-line no-extra-boolean-cast

      const headers = new Headers();
      headers.append('Authorization', `Basic ${btoa(apiKey)}`);

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };

      const params: UnknownObject = { period_from, period_to, page_size };

      for (const key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }

      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      const formattedQueryParams = new URLSearchParams(params as any).toString();

      const url = `https://api.octopus.energy/v1/electricity-meter-points/${options?.mpan || mpan}/meters/${
        options?.serial || serial
      }/consumption/?${formattedQueryParams}`;

      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res: any) => {
          if (Array.isArray(res?.results)) {
            const mutate = {
              ...res,
              results: res?.results.map((e: UnknownObject) => {
                const rate = rates.data.find((r) => new Date(r.valid_from).getTime() === new Date(e.interval_start).getTime());
                return {
                  ...e,
                  timestamp: new Date(e.interval_start).getTime(),
                  date: dayjs(e.interval_start).format('D MMM HH:mm'),
                  cost: (e.consumption * rate?.rate) / 100,
                  rate,
                };
              }),
            };

            console.log({ mutate });
            setConsumption(mutate.results);
            resolve(res?.results);
          } else {
            reject(res?.detail ?? 'Something went wrong!');
          }
        })
        .catch((error) => reject(error?.message ?? error))
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const getDaily = useCallback(() => {
    const daily = consumption.reduce((prev: UnknownObject, curr: UnknownObject) => {
      const date = new Date(new Date(curr.interval_start).toDateString()).getTime();
      const prevUsage = prev[date]?.usage || 0;
      const usage = prevUsage + curr.consumption;
      const prevCost = prev[date]?.cost || 0;
      const cost = prevCost + curr.cost;
      const dayData: UnknownObject = { usage, cost };

      return { ...prev, [date]: dayData };
    }, {});

    return Object.entries(daily).map((e: any) => {
      const timestamp = e[0];
      const dayData: UnknownObject = e[1];
      return {
        date: parseInt(timestamp),
        cost: Math.ceil(Number(dayData?.cost ?? 0) * 100) / 100,
        consumption: Math.ceil(Number(dayData?.usage ?? 0) * 100) / 100,
      };
    });
  }, [consumption]);

  return { consumption, getConsumption, getDaily, loading };
};
