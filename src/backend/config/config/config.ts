import type { ILoggerOptionsClientInfo, VonaAppInfo, VonaApplication, VonaConfigEnv, VonaConfigOptional } from 'vona';
import type { IDatabaseClientRecord } from 'vona-module-a-orm';
import type * as Winston from 'winston';
import { replaceTemplate } from '@cabloy/utils';
import { formatLoggerAxiosError, formatLoggerCtx, getLoggerPathPhysicalRoot, getPublicPathPhysicalRoot } from 'vona';

declare module 'vona' {
  export interface IInstanceRecord {
    shareTest: never;
    isolateTest: never;
  }
}

declare module 'vona-module-a-orm' {
  export interface IDatabaseClientRecord {
    isolateTest: never;
  }
}

export default function (appInfo: VonaAppInfo, env: VonaConfigEnv) {
  const config = {} as VonaConfigOptional;

  // meta
  config.meta = {
    flavor: appInfo.configMeta.flavor,
    mode: appInfo.configMeta.mode,
  };

  // server
  const publicDir = env.SERVER_PUBLICDIR || getPublicPathPhysicalRoot(appInfo);
  const loggerDir = env.SERVER_LOGGERDIR || getLoggerPathPhysicalRoot(appInfo);
  const subdomainOffset = Number.parseInt(env.SERVER_SUBDOMAINOFFSET || '1');
  const workers = Number.parseInt(env.SERVER_WORKERS!);
  config.server = {
    keys: (env.SERVER_KEYS || '').split(','),
    globalPrefix: env.SERVER_GLOBALPREFIX || '/api',
    publicDir,
    loggerDir,
    subdomainOffset,
    workers,
    listen: {
      hostname: env.SERVER_LISTEN_HOSTNAME,
      port: Number.parseInt(env.SERVER_LISTEN_PORT!),
      disable: env.SERVER_LISTEN_DISABLE === 'true',
    },
    serve: {},
  };

  // proxy
  config.proxy = {
    enabled: true,
    ipHeaders: 'x-real-ip,x-forwarded-for',
    hostHeaders: 'x-forwarded-host,host',
    protocolHeaders: 'x-forwarded-proto',
    maxProxyCount: 1,
    maxIpsCount: 15,
  };

  // logger
  config.logger = {
    rotate: {
      enable: env.LOGGER_ROTATE_ENABLE === 'true',
      options(filename: string) {
        return {
          filename: replaceTemplate(env.LOGGER_ROTATE_FILENAME!, { filename }),
          datePattern: env.LOGGER_ROTATE_DATEPATTERN,
          maxSize: env.LOGGER_ROTATE_MAXSIZE,
          maxFiles: env.LOGGER_ROTATE_MAXFILES,
        };
      },
    },
    base(this: VonaApplication, _clientInfo: ILoggerOptionsClientInfo, winston: typeof Winston) {
      return {
        format: winston.format.combine(
          formatLoggerAxiosError({ stack: true }),
          formatLoggerCtx(),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.timestamp(),
        ),
        transports: undefined,
      };
    },
    clients: {
      default(this: VonaApplication, clientInfo: ILoggerOptionsClientInfo) {
        const transports = [
          this.bean.logger.makeTransportFile(clientInfo, 'error', 'error'),
          this.bean.logger.makeTransportFile(clientInfo, 'warn', 'warn'),
          this.bean.logger.makeTransportFile(clientInfo, 'http', 'http'),
          this.bean.logger.makeTransportFile(clientInfo, 'combined'),
          this.bean.logger.makeTransportConsole(clientInfo),
        ].filter(item => !!item);
        return { transports };
      },
    },
  };

  // redis
  config.redis = {
    base: {
      host: env.REDIS_DEFAULT_HOST,
      port: Number.parseInt(env.REDIS_DEFAULT_PORT!),
      password: env.REDIS_DEFAULT_PASSWORD,
      db: Number.parseInt(env.REDIS_DEFAULT_DB!),
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
    clients: {
      default: { keyPrefix: `default_${appInfo.name}:` },
      redlock: {},
      queue: {},
      broadcast: {},
      cache: { keyPrefix: `cache_${appInfo.name}:` },
      io: { keyPrefix: `io_${appInfo.name}:` },
      summer: { keyPrefix: `summer_${appInfo.name}:` },
      model: { keyPrefix: `model_${appInfo.name}:` },
    },
  };

  // database
  config.database = {
    testDatabase: false,
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
    defaultClient: env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: env.DATABASE_CLIENT_PG_HOST,
          port: Number.parseInt(env.DATABASE_CLIENT_PG_PORT!),
          user: env.DATABASE_CLIENT_PG_USER,
          password: env.DATABASE_CLIENT_PG_PASSWORD,
          database: env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: env.DATABASE_CLIENT_MYSQL_HOST,
          port: Number.parseInt(env.DATABASE_CLIENT_MYSQL_PORT!),
          user: env.DATABASE_CLIENT_MYSQL_USER,
          password: env.DATABASE_CLIENT_MYSQL_PASSWORD,
          database: env.DATABASE_CLIENT_MYSQL_DATABASE,
        },
      },
    },
  };

  // Multi-Instance/Multi-Tenancy
  config.database.clients!.isolateTest = {
    ...config.database.clients![env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord],
  };

  // modules
  config.modules = {};

  // onions
  config.onions = {};

  return config;
}
