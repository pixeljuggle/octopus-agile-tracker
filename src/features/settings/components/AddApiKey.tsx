import { Spinner } from 'components';
import { CheckIcon } from 'components/Icons/CheckIcon';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useRates } from 'hooks/useRates';
import { useState } from 'react';

export const AddApiKey = () => {
  const { obus, onChangeHandler } = useSettings();
  const { getRates } = useRates();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState(obus?.apiKey ?? '');
  const [submitted, setSubmitted] = useState(false);

  const checkApiKey = async () => {
    setLoading(true);
    await getRates(1, apiKey)
      .then(() => {
        setError('');
        onChangeHandler('apiKey', apiKey);
      })
      .catch((e) => {
        setError(e?.message ?? e);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
        setSubmitted(true);
      });
  };

  const onChange = (value = '') => {
    setApiKey(value);
  };

  const onSave = async () => {
    await checkApiKey();
  };

  return (
    <section>
      {' '}
      <h2 className="mb-1 text-xl font-semibold">Add Your Octopus API Key</h2>
      <p className="mb-4 text-electric-violet-10">
        If you are an Octopus Energy customer, you can generate an API key from your{' '}
        <a
          className="focus reference external font-semibold text-spray outline-spray "
          rel="noreferrer"
          target="_blank"
          href="https://octopus.energy/dashboard/developer/"
        >
          online dashboard
        </a>
        .
      </p>
      {error ? <div className="mb-6 rounded  border border-amber-500 px-3 py-2 font-semibold text-amber-500">{String(error)}</div> : null}
      <div className="flex items-center gap-5">
        <input
          className=" w-full rounded  bg-electric-violet-900 px-4 py-3 font-semibold outline-4 outline-heliotrope-500 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
          id="apiKey"
          value={apiKey}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ab_live_j301PGAcVqDRrd18dcPrLEgu"
        />
      </div>
      <div className="mt-7 flex">
        <button
          disabled={loading}
          onClick={onSave}
          className=" flex rounded bg-heliotrope-500 px-3 py-2 font-semibold text-slate-800 hover:bg-heliotrope-400 focus-visible:outline-heliotrope-500 "
        >
          {loading ? (
            <Spinner className="h-6 w-6 text-electric-violet-800" />
          ) : !error && submitted ? (
            <CheckIcon className="h-6 w-6" />
          ) : (
            <p className="h-6">Save API Key</p>
          )}
        </button>
      </div>
    </section>
  );
};
