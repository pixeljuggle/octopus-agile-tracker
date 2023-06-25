/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { UnknownObject } from 'types';
import { average, minMax } from 'utils';

export const useRates = () => {
  const [rates, setRates] = useLocalStorage('rates', { results: [] });

  const { obus } = useSettings();

  const getRates = (page_size = 96, apiKey = '') => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // eslint-disable-next-line no-extra-boolean-cast

      const headers = new Headers();
      if (apiKey) {
        headers.append('Authorization', `Basic ${btoa(apiKey || obus?.apiKey)}`);
      }

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };

      const now = new Date().toDateString();

      const periodFrom = new Date(`${now} 01:00`).getTime();
      const periodFromString = new Date(periodFrom).toISOString();

      const params: UnknownObject = { period_from: periodFromString, page_size: page_size };

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
            const sorted = {
              ...res,
              results: res?.results
                .sort((a: UnknownObject, b: UnknownObject) => {
                  return new Date(a.valid_from).getTime() - new Date(b.valid_from).getTime();
                })
                .map((e: UnknownObject) => ({
                  ...e,
                  rate: e.value_inc_vat,
                  timestamp: new Date(e.valid_from).getTime(),
                  date: dayjs(e.valid_from).format('D MMM HH:mm'),
                })),
            };
            setRates(sorted);
            resolve(sorted);
          } else {
            reject(res?.detail ?? 'Something went wrong!');
          }
        })
        .catch((error) => reject(error?.message ?? error));
    });
  };

  const minMaxRange = minMax(rates.results, 'value_inc_vat');

  const avg = average(rates.results, 'value_inc_vat');

  return { rates: rates?.results ?? [], getRates, ...minMaxRange, avg };
};
