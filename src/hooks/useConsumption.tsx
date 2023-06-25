/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useLocalStorage } from 'hooks/useLocalStorage';
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
  const [consumption, setConsumption] = useLocalStorage('consumption', { results: [] });
  const [rates, setRates] = useState<UnknownObject[]>([]);
  const { obus } = useSettings();
  const { apiKey, mpan, serial } = obus;

  const getConsumption = (options: GetConsumptionParamTypes = { period_from: '', period_to: '', page_size: 96, mpan: '', serial: '' }) => {
    const { period_from = '', period_to = '', page_size = 96 } = options;
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
              results: res?.results.map((e: UnknownObject) => ({
                ...e,
                timestamp: new Date(e.interval_start).getTime(),
                date: dayjs(e.interval_start).format('D MMM HH:mm'),
              })),
            };
            setConsumption(mutate);
            resolve(res?.results);
          } else {
            reject(res?.detail ?? 'Something went wrong!');
          }
        })
        .catch((error) => reject(error?.message ?? error));
    });
  };

  const getRates = (options: GetRatesParamTypes = { period_from: '', period_to: '', page_size: 96 }) => {
    const { period_from = '', period_to = '', page_size = 96 } = options;
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

      const url = `https://api.octopus.energy/v1/products/AGILE-FLEX-22-11-25/electricity-tariffs/E-1R-AGILE-FLEX-22-11-25-G/standard-unit-rates/?${formattedQueryParams}`;

      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res: any) => {
          if (Array.isArray(res?.results)) {
            const mutate = res?.results.map((e: UnknownObject) => ({
              ...e,
              rate: e.value_inc_vat,
              timestamp: new Date(e.valid_from).getTime(),
              date: dayjs(e.valid_from).format('D MMM HH:mm'),
            }));

            setRates(mutate);
            resolve(res?.results);
          } else {
            reject(res?.detail ?? 'Something went wrong!');
          }
        })
        .catch((error) => reject(error?.message ?? error));
    });
  };

  const getDaily = useCallback(() => {
    const data = consumption?.results ?? [];
    const daily = data.reduce((prev: UnknownObject, curr: UnknownObject) => {
      const date = new Date(new Date(curr.interval_start).toDateString()).getTime();
      const prevUsage = prev[date]?.usage || 0;
      const usage = prevUsage + curr.consumption;

      const rate = rates.find((e) => e.valid_from === curr.interval_start) || { value_inc_vat: 0 };
      const cost = usage * rate.value_inc_vat;
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

  // const getDaily = useCallback(() => {
  //   const data = consumption?.results ?? [];
  //   const daily = data.reduce((prev: UnknownObject, curr: UnknownObject) => {
  //     const date = new Date(new Date(curr.interval_start).toDateString()).getTime();
  //     const usage = prev[date] || 0;
  //     const rate = rates.find((e) => e.valid_from === curr.interval_start) || {};

  //     return { ...prev, [date]: usage + curr.consumption };
  //   }, {});

  //   return Object.entries(daily).map((e) => ({ date: parseInt(e[0]), consumption: Math.ceil(Number(e[1]) * 100) / 100 }));
  // }, [consumption]);

  return { consumption: consumption?.results ?? [], getConsumption, getDaily, rates, getRates };
};
