import type { IModuleMain, PowerPartial, VonaApplication } from 'vona';
import type { ConfigRedis } from './types/redis.ts';
import { BeanSimple, deepExtend } from 'vona';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    const configDefault = combineConfigDefault(this.app);
    this.app.config.redis = deepExtend({}, configDefault, this.app.config.redis);
  }

  async moduleLoaded() {}

  async configLoaded(_config: any) {}
}

export function configDefault(app: VonaApplication): ConfigRedis {
  return {
    default: {
      host: process.env.REDIS_DEFAULT_HOST,
      port: Number.parseInt(process.env.REDIS_DEFAULT_PORT!),
      password: process.env.REDIS_DEFAULT_PASSWORD,
      db: Number.parseInt(process.env.REDIS_DEFAULT_DB!),
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
    clients: {
      default: { keyPrefix: `default_${app.name}:` },
      redlock: {},
      queue: {},
      broadcast: {},
      cache: { keyPrefix: `cache_${app.name}:` },
      io: { keyPrefix: `io_${app.name}:` },
      auth: { keyPrefix: `auth_${app.name}:` },
      summer: { keyPrefix: `summer_${app.name}:` },
      model: { keyPrefix: `model_${app.name}:` },
    },
  };
}

export function combineConfigDefault(app: VonaApplication) {
  let config: ConfigRedis = configDefault(app);
  const mode = app.config.meta.mode;
  if (mode === 'local') {
    config = deepExtend(config, configLocal());
  } else if (mode === 'prod') {
    config = deepExtend(config, configProd());
  } else if (mode === 'test') {
    config = deepExtend(config, configTest());
  }
  return config;
}

export function configLocal(): PowerPartial<ConfigRedis> {
  return {};
}

export function configProd(): PowerPartial<ConfigRedis> {
  return {};
}

export function configTest(): PowerPartial<ConfigRedis> {
  return {};
}
