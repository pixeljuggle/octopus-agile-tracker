/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_KEY_64 } from 'config';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { UnknownObject } from 'types';
import { average, minMax } from 'utils';

export const useRates = () => {
  const [rates, setRates] = useLocalStorage('rates', { results: [] });

  const getRates = () => {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${API_KEY_64}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const now = new Date().toDateString();

    const periodFrom = new Date(`${now} 01:00`).getTime();
    const periodFromString = new Date(periodFrom).toISOString();

    const page_size = '96';

    const params: UnknownObject = { period_from: periodFromString, page_size: page_size };

    for (const key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    const formattedQueryParams = new URLSearchParams(params as any).toString();

    const url = `https://api.octopus.energy/v1/products/AGILE-FLEX-22-11-25/electricity-tariffs/E-1R-AGILE-FLEX-22-11-25-G/standard-unit-rates/?${formattedQueryParams}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res: any) => {
        if (Array.isArray(res?.results)) {
          setRates(res);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const minMaxRange = minMax(rates.results, 'value_inc_vat');

  const avg = average(rates.results, 'value_inc_vat');

  return { rates: rates?.results ?? [], getRates, ...minMaxRange, avg };
};
