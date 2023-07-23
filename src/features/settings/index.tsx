import { AddApiKey } from 'features/settings/components/AddApiKey';
import { AddCharger } from 'features/settings/components/AddCharger';
import { AddMeter } from 'features/settings/components/AddMeter';

export const Settings = () => {
  return (
    <div className="flex flex-col gap-20" id="content">
      <AddApiKey />
      <AddMeter />
      <AddCharger />
    </div>
  );
};

export * from './providers/SettingsProvider';
