import { VonaAppInfo, VonaConfigOptional } from 'vona';

export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // keys
  config.keys = appInfo.name + '_1596889047267_3245';

  // instances
  config.instances = [
    {
      subdomain: '',
      password: '',
      title: '',
      config: {
        'a-base': {
          cors: { whiteList: 'http://localhost' },
        },
      },
    },
  ];

  // modules
  config.modules = {
    'a-base': {
      account: {
        // warning: if set true, should setup the provider's account of mail/sms
        needActivation: false,
      },
    },
  };

  return config;
}
