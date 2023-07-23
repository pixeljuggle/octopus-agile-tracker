/* eslint-disable @typescript-eslint/no-explicit-any */
import { CORS_PROXY } from 'config';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useState } from 'react';
import { UnknownObject } from 'types';

export type GetSessionsParamTypes = {
  chargerId?: string;
  from?: string;
  to?: number;
};

export type EaseeSessionType = {
  carConnected: string;
  carDisconnected: string;
  kiloWattHours: number;
  pricePerKwhExcludingVat: number;
  pricePrKwhIncludingVat: number;
  costExcludingVat: number;
  costIncludingVat: number;
  vatPercentage: number;
  currency: string;
  actualDurationSeconds: number;
  firstEnergyTransferPeriodStarted: string;
  lastEnergyTransferPeriodEnd: string;
  id: number;
};

export type EvChargerDetailsTypes = {
  chargerId?: string;
  accessToken?: string;
  refreshToken?: number;
  sessions?: EaseeSessionType[];
};

export const useEvCharger = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState<UnknownObject[]>([]);

  const { obus, setObus } = useSettings();
  const { chargerSession, charger, chargerUsername, chargerPassword } = obus;

  const updateChargerSession = (chargerSession: UnknownObject) => {
    const { accessToken, refreshToken } = chargerSession;
    setObus((prev: UnknownObject) => {
      return { ...prev, chargerSession: { accessToken, refreshToken } };
    });
  };

  const updateCharger = (charger = '') => {
    setObus((prev: UnknownObject) => {
      return { ...prev, charger };
    });
  };

  const authenticate = async () => {
    if (!chargerUsername) {
      throw new Error('Username not provided');
    }
    if (!chargerPassword) {
      throw new Error('Password not provided');
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      userName: chargerUsername,
      password: chargerPassword,
    });

    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };

    setLoading(true);

    await fetch('https://api.easee.com/api/accounts/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log({ authenticate: result });
        if (result?.errorCode) {
          throw new Error(result?.title ?? 'Something went wrong');
        }
        updateChargerSession(result);
        setError('');
      })
      .catch((error) => {
        console.log({ authenticate: error });
        setError(error?.message ?? 'Something went wrong');
        throw new Error(error?.message ?? 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const refreshToken = async () => {
    const { accessToken, refreshToken } = chargerSession;

    if (!accessToken) {
      throw new Error('accessToken not provided');
    }
    if (!refreshToken) {
      throw new Error('refreshToken not provided');
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      accessToken,
      refreshToken,
    });

    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };

    setLoading(true);

    await fetch('https://api.easee.com/api/accounts/refresh_token', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log({ refreshToken: result });
        updateChargerSession(result);
        setError('');
      })
      .catch(async (error) => {
        console.log({ refreshToken: error });
        setError(error?.message ?? 'Something went wrong');
        await authenticate();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getChargers = async () => {
    const { accessToken } = chargerSession;

    if (!accessToken) {
      throw new Error('accessToken not provided');
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);

    const requestOptions = {
      method: 'GET',
      headers,
    };

    setLoading(true);

    await fetch('https://api.easee.com/api/chargers', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log({ getChargers: result });
        if (Array.isArray(result)) {
          const charger = result[0]?.id ?? '';
          updateCharger(charger);
        } else {
          updateCharger('');
        }
      })
      .catch((error) => {
        console.log({ getChargers: error });
        setError(error?.message ?? 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSessions = async () => {
    await refreshToken();

    const { accessToken } = chargerSession;

    if (!accessToken) {
      throw new Error('accessToken not provided');
    }
    if (!charger) {
      throw new Error('charger id not provided');
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);

    const requestOptions = {
      method: 'GET',
      headers,
    };

    const daysToFetch = 29;
    const now = new Date();
    const start = new Date(new Date().setDate(now.getDate() - daysToFetch)).toISOString().split('.')[0] + 'Z';
    const end = new Date(new Date().setDate(now.getDate())).toISOString().split('.')[0] + 'Z';

    const url = `${CORS_PROXY}https://api.easee.com/api/sessions/charger/${charger}/sessions/${start}/${end}`;

    setLoading(true);

    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result: UnknownObject[]) => {
        console.log({ getSessions: result });
        if (Array.isArray(result)) {
          setSessions(result);
        }
      })
      .catch((error) => {
        console.log({ getSessions: error });
        setError(error?.message ?? 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getLastSession = async () => {
    const { accessToken } = chargerSession;

    if (!accessToken) {
      throw new Error('accessToken not provided');
    }
    if (!charger) {
      throw new Error('charger id not provided');
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);

    const requestOptions = {
      method: 'GET',
      headers,
    };

    const url = `${CORS_PROXY}https://api.easee.com/api/chargers/UKTULXXG/sessions/latest`;

    setLoading(true);

    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result: UnknownObject[]) => {
        console.log({ getSessions: result });
        if (Array.isArray(result)) {
          setSessions(result);
        }
      })
      .catch((error) => {
        console.log({ getSessions: error });
        setError(error?.message ?? 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sessions, loading, error, authenticate, refreshToken, getChargers, getSessions, getLastSession };
};
