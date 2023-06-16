/* eslint-disable jsx-a11y/no-autofocus */
import * as Dialog from '@radix-ui/react-dialog';
import { useRates } from 'features/rates';
import { useSettings } from 'features/settings/providers/SettingsProvider';
import { ReactElement, SetStateAction, useEffect } from 'react';
import { UnknownObject } from 'types';

type SettingsDialogPropType = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  onClose: () => void;
};
export const SettingsDialog = ({ open, setOpen, onClose }: SettingsDialogPropType): ReactElement => {
  const { obus, setObus, apiKey, setApiKey, loading, setLoading, error, setError } = useSettings();
  const { getRates } = useRates();

  useEffect(() => {
    setApiKey(obus?.apiKey ?? '');
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [open]);

  const checkApiKey = async () => {
    setLoading(true);
    await getRates(1, apiKey)
      .then(() => {
        setError('');
        setObus((prev: UnknownObject) => {
          return { ...prev, apiKey: apiKey };
        });
      })
      .then(async () => {
        await new Promise((r) => setTimeout(r, 500));
        onClose();
        setOpen(false);
      })
      .catch((e) => {
        setError(e?.message ?? e);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onChange = (value = '') => {
    setApiKey(value);
  };

  const onSave = async () => {
    await checkApiKey();
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-electric-violet-900 opacity-90 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className=" fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-electric-violet-950 p-[25px] text-spray-100 shadow-xl focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 text-lg font-semibold text-spray-50 ">Add Your API Key</Dialog.Title>
            <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal">
              <p>
                If you are an Octopus Energy customer, you can generate an API key from your{' '}
                <a className="reference external font-semibold text-spray" rel="noreferrer" target="_blank" href="https://octopus.energy/dashboard/developer/">
                  online dashboard
                </a>
                .
              </p>
            </Dialog.Description>
            {error ? <div className="mb-6 rounded  border border-amber-500 px-3 py-2 font-semibold text-amber-500">{String(error)}</div> : null}

            <fieldset className="mb-[15px] flex items-center gap-5">
              <input
                className="  w-full rounded bg-electric-violet-900 px-4 py-3 font-semibold outline-4 outline-electric-violet-800 placeholder:font-semibold placeholder:text-gray-600 focus-within:outline "
                id="name"
                value={apiKey}
                onChange={(e) => onChange(e.target.value)}
                placeholder="ab_live_j301PGAcVqDRrd18dcPrLEgu"
                autoFocus={false}
                tabIndex={-1}
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button
                disabled={loading}
                onClick={onSave}
                className="rounded  bg-heliotrope-500 px-3 py-2 font-semibold text-slate-800 hover:bg-heliotrope-400 focus:outline-none"
              >
                Save changes
              </button>
            </div>
            <button
              onClick={() => setOpen(false)}
              className=" absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-3xl text-electric-violet-700 hover:text-electric-violet-500 focus:outline-none"
              aria-label="Close"
            >
              &#10799;
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default SettingsDialog;
