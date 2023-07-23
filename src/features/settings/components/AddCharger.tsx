import { Spinner } from 'components';
import { CheckIcon } from 'components/Icons/CheckIcon';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useEvCharger } from 'hooks/useEvCharger';
import { useVibrate } from 'hooks/useVibrate';
import { useEffect, useLayoutEffect, useState } from 'react';
import { UnknownObject } from 'types';

const INITIAL_MESSAGE = 'Requires an Octopus Energy API key';

export const AddCharger = () => {
  const { obus, setObus } = useSettings();

  const { charger, chargerUsername, chargerPassword, chargerSession } = obus;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(INITIAL_MESSAGE);

  const [submitted, setSubmitted] = useState(false);

  const { authenticate, getChargers } = useEvCharger();

  const vibrate = useVibrate();

  const handleInput = (key = '', value = '') => {
    setObus((prev: UnknownObject) => ({ ...prev, [key]: value }));
  };

  const onSave = async () => {
    setLoading(true);
    await authenticate()
      .then(async () => {
        await getChargers();
        setError('');
      })
      .catch((e) => setError(e?.message ?? 'Something went wrong'));

    if (chargerSession?.accessToken) {
      await getChargers()
        .then(() => setSubmitted(true))
        .catch((e) => setError(e?.message ?? 'Something went wrong'));
    }
    setLoading(false);
    vibrate([20, 200, 20]);
  };

  useLayoutEffect(() => {
    if (obus.apiKey && error === INITIAL_MESSAGE) setError('');
  }, []);
  useEffect(() => {
    if (obus.apiKey && error === INITIAL_MESSAGE) setError('');
  }, [obus]);

  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Add Your EV Charger</h2>
      <p className="mb-4 text-electric-violet-10">
        Only{' '}
        <a
          className="focus reference external font-semibold text-spray outline-spray "
          rel="noreferrer"
          target="_blank"
          href="https://easee.com/uk/home-charging/"
        >
          Easee One
        </a>{' '}
        chargers are currently supported. More chargers will be supported soon.
      </p>
      <p className="mb-4 text-electric-violet-10">
        A proxy is required to get charging session data. All requests are encrypted and user credentials will only be stored on your device.
      </p>
      {error ? <div className="mb-6 rounded  border border-amber-500 px-3 py-2 font-semibold text-amber-500">{String(error)}</div> : null}
      <div className="flex flex-col">
        <h3 className="mb-2 font-semibold">Charger</h3>
        <input
          disabled={true}
          className=" w-full rounded bg-electric-violet-900 px-4  py-3 font-semibold text-gray-400 outline-4 outline-heliotrope-500 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
          id="charger"
          value={`Easee One ${charger}`}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className="mt-7 flex flex-col">
        <h3 className="mb-2 font-semibold">Username</h3>
        <input
          disabled={!obus.apiKey || !obus.mpan || !obus.serial}
          className=" w-full rounded  bg-electric-violet-900 px-4 py-3 font-semibold outline-4 outline-heliotrope-500 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
          id="username"
          value={chargerUsername}
          onChange={(e) => handleInput('chargerUsername', e.target.value)}
        />
      </div>
      <div className="mt-7 flex flex-col">
        <h3 className="mb-2 font-semibold">Password</h3>
        <input
          disabled={!obus.apiKey || !obus.mpan || !obus.serial}
          className=" w-full rounded  bg-electric-violet-900 px-4 py-3 font-semibold outline-4 outline-heliotrope-500 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
          id="password"
          value={chargerPassword}
          onChange={(e) => handleInput('chargerPassword', e.target.value)}
          placeholder=""
        />
      </div>
      <div className=" mt-7 flex">
        <button
          disabled={loading || !chargerPassword || !chargerUsername}
          onClick={onSave}
          className="flex rounded bg-heliotrope-500 px-3 py-2 font-semibold text-slate-800 hover:bg-heliotrope-400 focus-visible:outline-heliotrope-500 disabled:opacity-20 disabled:hover:bg-heliotrope-500 "
        >
          {loading ? (
            <Spinner className="h-6 w-6 text-electric-violet-800" />
          ) : !error && submitted ? (
            <CheckIcon className="h-6 w-6" />
          ) : (
            <p className="h-6">Save EV Charger</p>
          )}
        </button>
      </div>
    </section>
  );
};
