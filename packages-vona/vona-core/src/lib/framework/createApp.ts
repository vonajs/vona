import type { TypeAppInfoConfig, VonaAppInfo, VonaApplicationOptions } from '../../types/application/app.ts';
import type { VonaConfig } from '../../types/config/config.ts';
import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import { sleep } from '@cabloy/utils';
import { VonaApplication } from '../core/application.ts';
import { combineAppConfigDefault } from '../core/config.ts';
import { deepExtend, prepareEnv } from '../utils/util.ts';
import { Start } from './start.ts';

export async function createApp(bootstrapOptions: BootstrapOptions) {
  while (globalThis.__creating__) {
    await sleep(100);
  }
  try {
    globalThis.__creating__ = true;
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
      const start = new Start(globalThis.__app__);
      await start.start();
    }
    await globalThis.__app__.meta.waitAppStarted();
    return globalThis.__app__;
  } finally {
    globalThis.__creating__ = false;
  }
}

async function __createApp({ modulesMeta, locales, config, env, AppMonkey }: BootstrapOptions) {
  // env
  const env2 = prepareEnv(env);
  // appInfo
  const appInfo = prepareAppInfo(env2);
  // config
  const appConfig = await prepareConfig(appInfo, config, env2);
  // options
  const options: VonaApplicationOptions = {
    name: appInfo.name,
    projectPath: appInfo.projectPath,
    modulesMeta,
    locales,
    config: appConfig as unknown as VonaConfig,
    env: env2,
    AppMonkey,
  };
  return new VonaApplication(options);
}

function prepareAppInfo(env: NodeJS.ProcessEnv): VonaAppInfo {
  return {
    name: env.APP_NAME!,
    projectPath: process.cwd(),
    configMeta: {
      flavor: env.META_FLAVOR,
      mode: env.META_MODE,
    },
  };
}

async function prepareConfig(appInfo: VonaAppInfo, configs: TypeAppInfoConfig[], env: NodeJS.ProcessEnv) {
  const config = await combineAppConfigDefault(appInfo, env);
  for (const configItem of configs) {
    const res = await configItem(appInfo, env);
    if (res) {
      deepExtend(config, res);
    }
  }
  return config;
}
