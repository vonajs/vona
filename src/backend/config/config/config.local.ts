import { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // keys
  config.keys = appInfo.name + '_1596889047267_3245';

  // modules
  config.modules = {};

  return config;
}
