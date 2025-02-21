import type { TypeAppInfoConfig, VonaAppInfo } from '../../types/application/app.ts';
import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import { deepExtend } from 'vona';
import { combineConfigDefault } from '../core/config.ts';

export async function createApp({ modulesMeta, locales, config, env, AppMonkey }: BootstrapOptions) {
  // env
  prepareEnv(env);
  // appInfo
  const appInfo = prepareAppInfo();
  // config
  const appConfig = await prepareConfig(appInfo, config);
  // options
  const options: VonaApplicationOptions = {
    config: appConfig,
  };
  // env
  console.log(modulesMeta, locales, config, AppMonkey);
  // // zova app
  // const app = new ZovaApplication(vue, ctxRoot);
  // await app.initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
  // return app;
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
    baseDir: process.cwd(),
    configMeta: {
      flavor: process.env.META_FLAVOR,
      mode: process.env.META_MODE,
    },
  };
}

async function prepareConfig(appInfo: VonaAppInfo, configs: TypeAppInfoConfig[]) {
  const config = combineConfigDefault(appInfo.configMeta);
  for (const configItem of configs) {
    const res = await configItem(appInfo);
    if (res) {
      deepExtend(config, res);
    }
  }
  return config;
}
