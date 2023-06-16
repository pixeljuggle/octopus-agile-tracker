/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocalStorage } from 'hooks/useLocalStorage';
import { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import { ChildrenType, UnknownObject } from 'types';

type ContextValueType = {
  obus: UnknownObject;
  setObus: (e: any) => void;
  apiKey: string;
  setApiKey: (e: any) => void;
  loading: boolean;
  setLoading: (e: any) => void;
  error: string;
  setError: (e: any) => void;
};
const initObus = { apiKey: '', mpan: '', serial: '' };

const initContext: ContextValueType = {
  obus: initObus,
  setObus: () => null,
  apiKey: '',
  setApiKey: () => null,
  loading: true,
  setLoading: () => null,
  error: '',
  setError: () => null,
};

export const SettingsContext = createContext(initContext);

type ProviderChildrenType = { children?: ChildrenType };

export const SettingsProvider = ({ children }: ProviderChildrenType): ReactElement => {
  const [obus, setObus] = useLocalStorage('obus', { apiKey: '', mpan: '', serial: '' });
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const contextValue = useMemo(
    () => ({
      obus,
      setObus,
      apiKey,
      setApiKey,
      loading,
      setLoading,
      error,
      setError,
    }),
    [obus, loading, apiKey, error]
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const { obus, setObus, apiKey, setApiKey, loading, setLoading, error, setError } = useContext(SettingsContext);

  return {
    obus,
    setObus,
    apiKey,
    setApiKey,
    loading,
    setLoading,
    error,
    setError,
  };
};
