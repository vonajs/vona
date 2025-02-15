import type { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // keys
  config.keys = `${appInfo.name}_1596889047267_3245`;

  // subdomainOffset
  config.subdomainOffset = 2;

  // cookies
  config.cookies = {
    sameSite: 'none',
  };

  // i18n
  // config.i18n = {
  //   defaultLocale: 'zh-cn',
  // };

  return config;
}
