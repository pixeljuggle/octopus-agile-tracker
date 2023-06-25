/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocalStorage } from 'hooks/useLocalStorage';
import { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import { ChildrenType, UnknownObject } from 'types';

type ContextValueType = {
  obus: UnknownObject;
  setObus: (e: any) => void;
  error: string;
  setError: (e: any) => void;
  onChangeHandler: (key: string, value: string) => void;
};
const initObus = { apiKey: '', mpan: '', serial: '' };

const initContext: ContextValueType = {
  obus: initObus,
  setObus: () => null,
  error: '',
  setError: () => null,
  onChangeHandler: () => null,
};

export const SettingsContext = createContext(initContext);

type ProviderChildrenType = { children?: ChildrenType };

export const SettingsProvider = ({ children }: ProviderChildrenType): ReactElement => {
  const [obus, setObus] = useLocalStorage('obus', { apiKey: '', mpan: '', serial: '' });
  const [error, setError] = useState('');

  const onChangeHandler = (key: string, value: string) => {
    setObus((prev: UnknownObject) => {
      return { ...prev, [key]: value };
    });
  };
  const contextValue = useMemo(
    () => ({
      obus,
      setObus,
      error,
      setError,
      onChangeHandler,
    }),
    [obus, error]
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const { obus, setObus, error, setError, onChangeHandler } = useContext(SettingsContext);

  return {
    obus,
    setObus,
    error,
    setError,
    onChangeHandler,
  };
};
