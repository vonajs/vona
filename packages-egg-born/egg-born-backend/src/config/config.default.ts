import { VonaAppInfo, VonaConfigOptional, VonaContext } from 'vona';
import * as uuid from 'uuid';

// eslint-disable-next-line
export default function (appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // headers for proxy
  config.hostHeaders = 'x-forwarded-host,host';
  config.protocolHeaders = 'x-forwarded-proto';
  config.ipHeaders = 'x-forwarded-for';

  // cluster
  config.cluster = {
    listen: {
      hostname: process.env.SERVER_LISTEN_HOSTNAME,
      port: parseInt(process.env.SERVER_LISTEN_PORT),
    },
  };

  // globalPrefix
  config.globalPrefix = '/api';

  // development
  config.development = {
    debounce: 1000,
  };

  // versionReady
  config.versionReady = {
    retry: {
      timeout: 3000,
    },
  };

  // safe
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // io
  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: ['packet'],
      },
    },
    generateId: () => {
      return uuid.v4();
    },
  };

  // jwt
  config.jwt = {
    secret: null, // default is same as config.keys
    credentialsRequired: false,
    property: 'jwt',
    scene: {
      query: {
        maxAge: 2 * 60 * 1000, // 2m
      },
    },
    // not placed in jwt.scene for security
    oauth: {
      accessToken: {
        maxAge: 2 * 60 * 60 * 1000, // 2h
      },
      refreshToken: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
      },
    },
    ignore: /\/api\/static\//,
  };

  // cookies
  config.cookies = {
    overwrite: true,
  };

  // model
  config.model = {
    disableDeleted: false,
    disableInstance: false,
    disableUpdateTime: false,
  };

  // instances
  config.instances = [];

  // onions
  config.onions = {};

  // modules
  config.modules = {};

  // coreMiddleware
  config.coreMiddleware = [
    // 'meta', 'siteFile', 'notfound', 'bodyParser', 'overrideMethod'
  ];

  // i18n
  config.i18n = {
    defaultLocale: 'en-us',
  };

  // multipart
  config.multipart = {
    fileSize: '30mb',
    fileExtensions: [
      '.txt',
      '.ini',
      '.md',
      '.apk',
      '.msi',
      '.rar',
      '.zip',
      '.tar',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.doc',
      '.docx',
      '.pdf',
      '.aac',
      '.ogg',
      '.m4a',
      '.mp3',
      '.wav',
    ],
  };

  // database
  config.database = {
    testDatabase: false,
    defaultClient: process.env.DATABASE_DEFAULT_CLIENT,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: process.env.DATABASE_CLIENT_PG_HOST,
          port: parseInt(process.env.DATABASE_CLIENT_PG_PORT),
          user: process.env.DATABASE_CLIENT_PG_USER,
          password: process.env.DATABASE_CLIENT_PG_PASSWORD,
          database: process.env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: process.env.DATABASE_CLIENT_MYSQL_HOST,
          port: parseInt(process.env.DATABASE_CLIENT_MYSQL_PORT),
          user: process.env.DATABASE_CLIENT_MYSQL_USER,
          password: process.env.DATABASE_CLIENT_MYSQL_PASSWORD,
          database: process.env.DATABASE_CLIENT_MYSQL_DATABASE,
        },
      },
    },
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
  };

  // redis
  config.redis = {
    default: {
      host: process.env.REDIS_DEFAULT_HOST,
      port: parseInt(process.env.REDIS_DEFAULT_PORT),
      password: process.env.REDIS_DEFAULT_PASSWORD,
      db: parseInt(process.env.REDIS_DEFAULT_DB),
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
      auth: { keyPrefix: `auth_${appInfo.name}:` },
      summer: { keyPrefix: `summer_${appInfo.name}:` },
      model: { keyPrefix: `model_${appInfo.name}:` },
    },
  };

  // onerror
  config.onerror = {
    appErrorFilter(err: Error, ctx: VonaContext) {
      if (!err) return false;
      _performErrorFilters(ctx, err, 'log');
      return false;
    },
    json(err: Error, ctx: VonaContext) {
      _performErrorFilters(ctx, err, 'json');
    },
    html(err: Error, ctx: VonaContext) {
      _performErrorFilters(ctx, err, 'html');
    },
  };

  return config;
}

function _performErrorFilters(ctx: VonaContext, err: Error, method: string) {
  return ctx.app.ctxStorage.run(ctx as any, () => {
    const beanFilter = ctx.app.bean._getBean('a-aspect.service.filter' as never) as any;
    return beanFilter.performErrorFilters(err, method);
  });
}
