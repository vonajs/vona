import type { IModuleMain, PowerPartial, VonaApplication } from 'vona';
import type { ConfigRedis } from './types/redis.ts';
import { BeanSimple, combineConfigDefault, deepExtend } from 'vona';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    const _configDefault = await combineConfigDefault<ConfigRedis>(this.app, configDefault);
    this.app.config.redis = deepExtend({}, _configDefault, this.app.config.redis);
  }

  async moduleLoaded() {}

  async configLoaded(_config: any) {}
}

export async function configDefault(app: VonaApplication): Promise<PowerPartial<ConfigRedis>> {
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
