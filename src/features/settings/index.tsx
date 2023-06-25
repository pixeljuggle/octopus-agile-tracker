import { AddApiKey } from 'features/settings/components/AddApiKey';
import { AddMeter } from 'features/settings/components/AddMeter';

export const Settings = () => {
  return (
    <div className="flex flex-col gap-14" id="content">
      <AddApiKey />
      <AddMeter />
    </div>
  );
};

export * from './providers/SettingsProvider';
