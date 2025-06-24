import type { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (_appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // instances
  config.instances = [
    { instanceName: '', password: '', title: '' },
  ];

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
