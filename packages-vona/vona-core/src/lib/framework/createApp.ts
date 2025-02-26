import type { TypeAppInfoConfig, VonaAppInfo, VonaApplicationOptions } from '../../types/application/app.ts';
import type { VonaConfig } from '../../types/config/config.ts';
import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import { VonaApplication } from '../core/application.ts';
import { combineAppConfigDefault } from '../core/config.ts';
import { deepExtend } from '../utils/util.ts';
import { Start } from './start.ts';

export async function createApp(bootstrapOptions: BootstrapOptions) {
  globalThis.__bootstrapOptions__ = bootstrapOptions;
  const { modulesMeta, locales, config, env, AppMonkey } = bootstrapOptions;
  if (!globalThis.__app__) {
    globalThis.__app__ = await __createApp({
      modulesMeta,
      locales,
      config,
      env,
      AppMonkey,
    });
  }
  await globalThis.__app__.meta.waitAppStarted();
  return globalThis.__app__;
}

async function __createApp({ modulesMeta, locales, config, env, AppMonkey }: BootstrapOptions) {
  // env
  prepareEnv(env);
  // appInfo
  const appInfo = prepareAppInfo();
  // config
  const appConfig = await prepareConfig(appInfo, config);
  // options
  const options: VonaApplicationOptions = {
    name: appInfo.name,
    projectPath: appInfo.projectPath,
    modulesMeta,
    locales,
    config: appConfig as unknown as VonaConfig,
    AppMonkey,
  };
  const app = new VonaApplication(options);
  const start = new Start(app);
  await start.start();
  return app;
}

function prepareEnv(env: { [key: string]: string | boolean }) {
  for (const key of Object.keys(env)) {
    if (process.env[key] === undefined && env[key] !== false) {
      process.env[key] = env[key].toString();
    }
  }
}

function prepareAppInfo(): VonaAppInfo {
  return {
    name: process.env.APP_NAME!,
    projectPath: process.cwd(),
    configMeta: {
      flavor: process.env.META_FLAVOR,
      mode: process.env.META_MODE,
    },
  };
}

async function prepareConfig(appInfo: VonaAppInfo, configs: TypeAppInfoConfig[]) {
  const config = await combineAppConfigDefault(appInfo);
  for (const configItem of configs) {
    const res = await configItem(appInfo);
    if (res) {
      deepExtend(config, res);
    }
  }
  return config;
}
