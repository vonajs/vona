import type { VonaConfigMeta } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './types.ts';
import path from 'node:path';
import * as dotenv from '@cabloy/dotenv';
import { glob } from '@cabloy/module-glob';
import { getEnvMeta } from './utils.ts';

export function createConfigUtils(
  configMeta: VonaConfigMeta,
  configOptions: VonaBinConfigOptions,
): {
    loadEnvs: () => { [name: string]: string };
    loadModulesMeta: () => ReturnType<typeof glob>;
  } {
  let __modulesMeta: Awaited<ReturnType<typeof glob>>;
  return {
    loadEnvs: __loadEnvs,
    loadModulesMeta: __loadModulesMeta,
  };

  //////////////////////////////

  function __loadEnvs() {
    const meta = getEnvMeta(configMeta);
    const envDir = path.join(configOptions.appDir, 'env');
    const envs = dotenv.loadEnvs(meta, envDir, '.env');
    const res = Object.assign(
      {
        NODE_ENV: meta.mode,
      },
      envs,
      {
        META_FLAVOR: meta.flavor,
        META_MODE: meta.mode,
        META_APP_MODE: meta.appMode,
      },
      // compatible with quasar
      {
        DEV: meta.mode === 'development',
        PROD: meta.mode === 'production',
        SSR: meta.appMode === 'ssr',
        // DEBUGGING: meta.mode === 'development',
        // CLIENT: envs!.APP_SERVER === 'true',
        // SERVER: envs!.APP_SERVER !== 'true',
        // MODE: meta.appMode,
      },
    );
    for (const key of ['NODE_ENV', 'META_FLAVOR', 'META_MODE', 'META_APP_MODE', 'DEV', 'PROD', 'SSR']) {
      if (res[key] as any !== false) {
        process.env[key] = res[key];
      }
    }
    // ok
    return res;
  }

  async function __loadModulesMeta() {
    const meta = getEnvMeta(configMeta);
    // modules
    __modulesMeta = await glob({
      projectMode: 'zova',
      projectPath: configOptions.appDir,
      disabledModules: __getDisabledModules(),
      disabledSuites: process.env.PROJECT_DISABLED_SUITES,
      log: false,
      meta,
    });
    return __modulesMeta;
  }

  function __getDisabledModules() {
    let modules: string[] | string = process.env.PROJECT_DISABLED_MODULES ?? '';
    if (!Array.isArray(modules)) modules = modules ? modules.split(',') : [];
    if (process.env.PINIA_ENABLED === 'false') {
      modules.push('a-pinia');
    }
    return modules;
  }
}
