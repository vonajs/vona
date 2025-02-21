import type { VonaAppInfo } from 'vona';
import type { VonaConfigOptional } from '../../types/config/config.ts';
import os from 'node:os';
import path from 'node:path';
import fse from 'fs-extra';
import { deepExtend } from 'vona';

export async function combineConfigDefault(appInfo: VonaAppInfo) {
  let config: VonaConfigOptional = await configDefault(appInfo);
  const mode = appInfo.configMeta.mode;
  if (mode === 'local') {
    config = deepExtend(config, configLocal());
  } else if (mode === 'prod') {
    config = deepExtend(config, configProd());
  } else if (mode === 'test') {
    config = deepExtend(config, configTest());
  }
  return config;
}

export async function configDefault(appInfo: VonaAppInfo): Promise<VonaConfigOptional> {
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
      keys: (process.env.SERVER_KEYS || '').split(','),
      globalPrefix: process.env.SERVER_GLOBALPREFIX || '/api',
      publicDir: process.env.SERVER_PUBLICDIR || await getPublicPathPhysicalRoot(appInfo),
      subdomainOffset: Number.parseInt(process.env.SERVER_SUBDOMAINOFFSET || '1'),
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

async function getPublicPathPhysicalRoot(appInfo: VonaAppInfo) {
  const mode = appInfo.configMeta.mode;
  let publicDir: string;
  if (mode === 'test' || mode === 'local') {
    publicDir = path.join(appInfo.projectPath, '.app/public');
  } else {
    publicDir = path.join(os.homedir(), 'vona', appInfo.name, 'public');
  }
  await fse.ensureDir(publicDir);
  return publicDir;
}
