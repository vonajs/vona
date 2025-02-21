import type { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // server
  config.server = {
    keys: [`${appInfo.name}_1596889047267_3245`],
  };

  return config;
}
