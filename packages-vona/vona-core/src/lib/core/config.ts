import type { VonaAppInfo } from '../../types/application/app.ts';
import type { VonaConfigOptional } from '../../types/config/config.ts';
import type { PowerPartial } from '../../types/utils/powerPartial.ts';
import type { VonaApplication } from './application.ts';
import os from 'node:os';
import path from 'node:path';
import fse from 'fs-extra';
import { deepExtend } from '../utils/util.ts';
import { combineLoggerDefault } from './loggerDefault.ts';

export async function combineAppConfigDefault(appInfo: VonaAppInfo) {
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
  // server
  const publicDir = process.env.SERVER_PUBLICDIR || await getPublicPathPhysicalRoot(appInfo);
  const loggerDir = process.env.SERVER_LOGGERDIR || await getLoggerPathPhysicalRoot(appInfo);
  const subdomainOffset = Number.parseInt(process.env.SERVER_SUBDOMAINOFFSET || '1');
  const workers = Number.parseInt(process.env.SERVER_WORKERS!);
  // logger
  const logger = combineLoggerDefault(appInfo, loggerDir);
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
      publicDir,
      loggerDir,
      subdomainOffset,
      workers,
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
    logger,
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

async function getLoggerPathPhysicalRoot(appInfo: VonaAppInfo) {
  const mode = appInfo.configMeta.mode;
  let loggerDir: string;
  if (mode === 'test' || mode === 'local') {
    loggerDir = path.join(appInfo.projectPath, '.app/logs');
  } else {
    loggerDir = path.join(os.homedir(), 'vona', appInfo.name, 'logs');
  }
  await fse.ensureDir(loggerDir);
  return loggerDir;
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

export type TypeConfigLoader<T> = (app: VonaApplication) => Promise<PowerPartial<T>>;

export async function combineConfigDefault<T>(
  app: VonaApplication,
  configDefault: TypeConfigLoader<T>,
  configLocal?: TypeConfigLoader<T>,
  configProd?: TypeConfigLoader<T>,
  configTest?: TypeConfigLoader<T>,
): Promise<PowerPartial<T>> {
  let config = await configDefault(app);
  const mode = app.config.meta.mode;
  if (mode === 'local' && configLocal) {
    config = deepExtend(config, await configLocal(app));
  } else if (mode === 'prod' && configProd) {
    config = deepExtend(config, await configProd(app));
  } else if (mode === 'test' && configTest) {
    config = deepExtend(config, await configTest(app));
  }
  return config;
}
