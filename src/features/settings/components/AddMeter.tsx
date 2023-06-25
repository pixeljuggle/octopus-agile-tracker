import { Spinner } from 'components';
import { CheckIcon } from 'components/Icons/CheckIcon';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { useConsumption } from 'hooks/useConsumption';
import { useEffect, useLayoutEffect, useState } from 'react';
import { UnknownObject } from 'types';

export const AddMeter = () => {
  const { obus, setObus } = useSettings();
  const { getConsumption } = useConsumption();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('Requires an Octopus Energy account');
  const [mpan, setMpan] = useState(obus?.mpan ?? '');
  const [serial, setSerial] = useState(obus?.serial ?? '');
  const [submitted, setSubmitted] = useState(false);

  const checkApiKey = async () => {
    setLoading(true);
    await getConsumption({
      page_size: 1,
      mpan,
      serial,
    })
      .then(() => {
        setError('');
        setObus((prev: UnknownObject) => ({ ...prev, mpan, serial }));
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

  useLayoutEffect(() => {
    if (obus.apiKey && error === 'Requires an Octopus Energy account') setError('');
  }, []);
  useEffect(() => {
    if (obus.apiKey && error === 'Requires an Octopus Energy account') setError('');
  }, [obus]);

  const onSave = async () => {
    await checkApiKey();
  };

  return (
    <section>
      {' '}
      <h2 className="mb-1 text-xl font-semibold">Add Your Meter Point</h2>
      <p className="mb-4 text-electric-violet-10">
        You can get the meter point MPAN and serial from your{' '}
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
      <div className="flex flex-col">
        <h3 className="mb-2 font-semibold">Meter MPAN</h3>
        <input
          disabled={!obus.apiKey}
          className=" w-full rounded  bg-electric-violet-900 px-4 py-3 font-semibold outline-4 outline-heliotrope-500 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
          id="mpan"
          value={mpan}
          onChange={(e) => setMpan(e.target.value)}
          placeholder="1610098486932"
        />
      </div>
      <div className="mt-7 flex flex-col">
        <h3 className="mb-2 font-semibold">Meter Serial</h3>
        <input
          disabled={!obus.apiKey}
          className=" w-full rounded  bg-electric-violet-900 px-4 py-3 font-semibold outline-4 outline-heliotrope-500 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
          id="serial"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="17L3261877"
        />
      </div>
      <div className=" mt-7 flex">
        <button
          disabled={loading || !obus.apiKey}
          onClick={onSave}
          className="flex rounded bg-heliotrope-500 px-3 py-2 font-semibold text-slate-800 hover:bg-heliotrope-400 focus-visible:outline-heliotrope-500 disabled:opacity-20 disabled:hover:bg-heliotrope-500 "
        >
          {loading ? (
            <Spinner className="h-6 w-6 text-electric-violet-800" />
          ) : !error && submitted ? (
            <CheckIcon className="h-6 w-6" />
          ) : (
            <p className="h-6">Save Meter Point</p>
          )}
        </button>
      </div>
    </section>
  );
};
