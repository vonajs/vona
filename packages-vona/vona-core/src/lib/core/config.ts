import type { VonaAppInfo } from '../../types/application/app.ts';
import type { VonaConfigOptional } from '../../types/config/config.ts';
import type { VonaConfigEnv } from '../../types/utils/env.ts';
import type { PowerPartial } from '../../types/utils/powerPartial.ts';
import type { VonaApplication } from './application.ts';
import os from 'node:os';
import path from 'node:path';
import fse from 'fs-extra';
import { deepExtend } from '../utils/util.ts';

export function combineAppConfigDefault(appInfo: VonaAppInfo, env: VonaConfigEnv) {
  let config: VonaConfigOptional = configDefault(appInfo, env);
  const mode = appInfo.configMeta.mode;
  if (mode === 'dev') {
    config = deepExtend(config, configDev(env));
  } else if (mode === 'prod') {
    config = deepExtend(config, configProd(env));
  } else if (mode === 'test') {
    config = deepExtend(config, configTest(env));
  }
  return config;
}

export function configDefault(_appInfo: VonaAppInfo, _env: VonaConfigEnv): VonaConfigOptional {
  return {};
}

export function configDev(_env: VonaConfigEnv): VonaConfigOptional {
  return {};
}

export function configProd(_env: VonaConfigEnv): VonaConfigOptional {
  return {};
}

export function configTest(_env: VonaConfigEnv): VonaConfigOptional {
  return {};
}

export type TypeConfigLoader<T> = (app: VonaApplication) => Promise<PowerPartial<T>>;

export async function combineConfigDefault<T>(
  app: VonaApplication,
  configDefault: TypeConfigLoader<T>,
  configDev?: TypeConfigLoader<T>,
  configProd?: TypeConfigLoader<T>,
  configTest?: TypeConfigLoader<T>,
): Promise<PowerPartial<T>> {
  let config = await configDefault(app);
  const mode = app.config.meta.mode;
  if (mode === 'dev' && configDev) {
    config = deepExtend(config, await configDev(app));
  } else if (mode === 'prod' && configProd) {
    config = deepExtend(config, await configProd(app));
  } else if (mode === 'test' && configTest) {
    config = deepExtend(config, await configTest(app));
  }
  return config;
}

export function getLoggerPathPhysicalRoot(appInfo: VonaAppInfo) {
  const mode = appInfo.configMeta.mode;
  let loggerDir: string;
  if (mode === 'test' || mode === 'dev') {
    loggerDir = path.join(appInfo.projectPath, '.app/logs');
  } else {
    loggerDir = path.join(os.homedir(), 'vona', appInfo.name, 'logs');
  }
  fse.ensureDirSync(loggerDir);
  return loggerDir;
}

export function getPublicPathPhysicalRoot(appInfo: VonaAppInfo) {
  const mode = appInfo.configMeta.mode;
  let publicDir: string;
  if (mode === 'test' || mode === 'dev') {
    publicDir = path.join(appInfo.projectPath, '.app/public');
  } else {
    publicDir = path.join(os.homedir(), 'vona', appInfo.name, 'public');
  }
  fse.ensureDirSync(publicDir);
  return publicDir;
}

export function getRuntimePathPhysicalRoot(app: VonaApplication) {
  const mode = app.config.meta.mode;
  let runtimeDir: string;
  if (mode === 'test' || mode === 'dev') {
    runtimeDir = path.join(app.options.projectPath, '.app/runtime');
  } else {
    runtimeDir = path.join(os.homedir(), 'vona', app.options.name, 'runtime');
  }
  fse.ensureDirSync(runtimeDir);
  return runtimeDir;
}
