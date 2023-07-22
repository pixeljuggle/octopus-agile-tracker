/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetRatesParamTypes, useGetRates } from 'hooks/useGetRates';
import { createContext, ReactElement, useCallback, useContext, useEffect, useMemo } from 'react';
import { ChildrenType, UnknownObject } from 'types';
import { average, minMax } from 'utils';

type ContextValueType = {
  loading: boolean;
  data: UnknownObject[];
  getRates: (options: GetRatesParamTypes) => Promise<UnknownObject[]>;
};

const initContext: ContextValueType = {
  loading: true,
  data: [],
  getRates: async () => [],
};

const RatesContext = createContext(initContext);

type ProviderChildrenType = { children?: ChildrenType };

export const RatesProvider = ({ children }: ProviderChildrenType): ReactElement => {
  const { data, getRates, loading } = useGetRates();

  useEffect(() => {
    getRates({ page_size: 1488 });
  }, []);

  const contextValue = useMemo(
    () => ({
      data,
      getRates,
      loading,
    }),
    [data, loading]
  );

  return <RatesContext.Provider value={contextValue}>{children}</RatesContext.Provider>;
};

export const useRates = () => {
  const { data, getRates, loading } = useContext(RatesContext);

  const getTodaysRates = useCallback(() => {
    if (Array.isArray(data)) {
      return [...data].splice(0, 64);
    } else {
      return [];
    }
  }, [data]);

  const { min, max } = minMax(getTodaysRates(), 'value_inc_vat');

  const avg = average(getTodaysRates(), 'value_inc_vat');

  return {
    loading,
    data,
    getRates,
    getTodaysRates,
    min,
    avg,
    max,
  };
};
