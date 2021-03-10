import defaultSettings from '../../config/defaultSettings';
import type { DefaultSettings } from '../../config/defaultSettings';

export type SettingModelType = {
  namespace: 'settings';
  state: DefaultSettings;
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
};

export default SettingModel;
