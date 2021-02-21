import type { Settings as ProSettings } from '@ant-design/pro-layout';
import type { StateType } from './login';

export type Loading = {
  effects: Record<string, boolean | undefined>;
};

export type ConnectState = {
  settings: ProSettings;
  login: StateType;
  loading: LoadIng;
};
