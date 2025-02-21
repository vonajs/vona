import type { VonaConfigMeta } from '@cabloy/module-info';
import type { VonaConfigOptional } from '../../types/config/config.ts';
import { deepExtend } from 'vona';

export function combineConfigDefault(configMeta: VonaConfigMeta) {
  let config: VonaConfigOptional = configDefault();
  if (configMeta.mode === 'local') {
    config = deepExtend(config, configLocal());
  } else if (configMeta.mode === 'prod') {
    config = deepExtend(config, configProd());
  } else if (configMeta.mode === 'test') {
    config = deepExtend(config, configTest());
  }
  return config;
}

export function configDefault(): VonaConfigOptional {
  return {
    meta: {
      flavor: process.env.META_FLAVOR,
      mode: process.env.META_MODE,
    },
    env: {
      appName: process.env.APP_NAME,
      appTitle: process.env.APP_TITLE,
      appVersion: process.env.APP_VERSION,
    },
    server: {
      keys: process.env.SERVER_KEYS,
      globalPrefix: process.env.SERVER_GLOBALPREFIX || '/api',
      listen: {
        hostname: process.env.SERVER_LISTEN_HOSTNAME,
        port: Number.parseInt(process.env.SERVER_LISTEN_PORT!),
      },
    },
    proxy: {
      enabled: true,
      ipHeaders: 'x-real-ip,x-forwarded-for',
      hostHeaders: 'x-forwarded-host,host',
      protocolHeaders: 'x-forwarded-proto',
      maxProxyCount: 1,
      maxIpsCount: 15,
    },
    //
    instances: [],
    modules: {},
  };
}

export function configLocal(): VonaConfigOptional {
  return {
    proxy: {
      enabled: true,
    },
  };
}

export function configProd(): VonaConfigOptional {
  return {
    proxy: {
      enabled: true,
    },
  };
}

export function configTest(): VonaConfigOptional {
  return {
    proxy: {
      enabled: false,
    },
  };
}
