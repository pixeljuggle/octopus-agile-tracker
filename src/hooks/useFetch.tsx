/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEVELOPMENT_API_URL } from 'config/index';
import { useNotifications } from 'hooks/useNotifications';
import { useState } from 'react';

export type TApiResponse = {
  _fetch: (endpoint: string, options?: RequestInit) => Promise<any>;
  status: number;
  statusText: string;
  data: any;
  error: any;
  loading: boolean;
};

export const useFetch = (initialData: unknown = null): TApiResponse => {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [data, setData] = useState<any>(initialData);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const notify = useNotifications();

  const getURL = (endpoint: string) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return `${DEVELOPMENT_API_URL}${endpoint}`;
    } else {
      return endpoint;
    }
  };

  const _fetch = async (endpoint: string, options?: RequestInit) => {
    setLoading(true);
    const url = getURL(endpoint);
    return new Promise(async (resolve, reject) => {
      await fetch(url, options)
        .then(async (response) => {
          setStatus(response.status);
          setStatusText(response.statusText);

          let json;
          if (!response.ok) {
            switch (response.status) {
              case 304:
                return response.json();
              case 401:
                //Session expired
                notify.warning({ body: 'Session expired' }, 6000);
                throw new Error('401 Unauthorized');
              case 403:
                // Action is not permitted
                notify.error({ title: 'Permission Error', body: 'This action is not permitted' }, 6000);
                throw new Error('403 Forbidden');
              case 500:
                notify.error({ title: 'Unexpected Error', body: '500 Internal Server Error' }, 6000);
                throw new Error('500 Internal Server Error');
              default:
                json = await response.json();
                if (json?.error) {
                  notify.error({ title: 'Unexpected Error', body: json?.error }, 6000);
                } else {
                  notify.error({ title: 'Unexpected Error', body: response.statusText }, 6000);
                  throw new Error('An unknown API server error occured');
                }
            }
          }

          return response.json();
        })
        .then((json) => {
          setData(json);
          if (json?.error) {
            setError(json?.error);
            reject(json?.error);
          }
          resolve(json);
        })
        .catch((error) => {
          setError(error);
          reject(error?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return { _fetch, status, statusText, data, error, loading };
};
