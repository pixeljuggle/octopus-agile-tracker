/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useState } from 'react';
import { UnknownObject } from 'types';

export type GetRatesParamTypes = {
  period_from?: string;
  period_to?: string;
  page_size?: number;
  apiKey?: string;
};

export const useGetRates = () => {
  const [rates, setRates] = useState<UnknownObject[]>([]);
  const [loading, setLoading] = useState(false);

  const getRates: (options: GetRatesParamTypes) => Promise<UnknownObject[]> = async (
    options: GetRatesParamTypes = { period_from: '', period_to: '', page_size: 96 }
  ): Promise<UnknownObject[]> => {
    const { period_from = '', period_to = '', page_size = 96, apiKey = '' } = options;

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-async-promise-executor
      const headers = new Headers();
      if (apiKey) {
        headers.append('Authorization', `Basic ${btoa(apiKey)}`);
      }

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };

      const params: UnknownObject = {
        period_from,
        period_to: period_to ? new Date(new Date(period_to).getTime() + 30 * 60 * 1000).toISOString() : period_to,
        page_size,
      };

      for (const key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }

      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      const formattedQueryParams = new URLSearchParams(params as any).toString();

      const url = `https://api.octopus.energy/v1/products/AGILE-FLEX-22-11-25/electricity-tariffs/E-1R-AGILE-FLEX-22-11-25-G/standard-unit-rates/?${formattedQueryParams}`;

      setLoading(true);
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res: any) => {
          if (Array.isArray(res?.results)) {
            const _rates = res?.results.map((e: UnknownObject) => {
              return {
                ...e,
                rate: e.value_inc_vat,
                timestamp: new Date(e.valid_from).getTime(),
                iso: new Date(e.valid_from).toISOString(),
                date: dayjs(e.valid_from).format('D MMM HH:mm'),
              };
            });
            console.log({ useGetRates: _rates });
            setRates(_rates);
            resolve(_rates);
            return _rates;
          } else {
            console.log(res?.detail ?? 'Something went wrong!');
            reject(res?.detail ?? 'Something went wrong!');
          }
        })
        .catch((e) => {
          reject(e?.message ?? 'Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return { data: rates, getRates, loading };
};
