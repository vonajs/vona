import { VonaAppInfo, VonaConfigOptional } from 'vona';
import path from 'path';
import * as uuid from 'uuid';

const {
  detectStatus,
  detectErrorMessage,
  /* accepts,*/
} = require('egg-onerror/lib/utils');

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

  // modules
  config.modules = {};

  // i18n
  config.i18n = {
    defaultLocale: 'en-us',
  };

  // session
  config.session = {
    key: 'CABLOY_SESS',
    httpOnly: true,
    encrypt: true,
    ignore: /\/api\/static\//,
  };

  // passportInitialize
  config.passportInitialize = {
    ignore: /\/api\/static\//,
  };

  // passportSession
  config.passportSession = {
    ignore: /\/api\/static\//,
  };

  // bodyParser
  config.bodyParser = {
    jsonLimit: '30mb',
    formLimit: '30mb',
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

  // static
  config.static = {
    prefix: '/api/static/',
    preload: false,
    alias: {
      '/favicon.ico': '/api/static/a/base/img/favicon.ico',
    },
    getFullPath,
  };

  // appReady middleware
  config.appReady = {
    ignore: /\/api\/static\//,
  };
  // instance middleware
  config.instance = {
    ignore: /\/api\/static\//,
  };

  // queue
  config.queue = {
    redlock: {
      clients: ['redlock'],
      options: {
        driftFactor: 0.01,
        retryCount: -1,
        retryDelay: 200,
        retryJitter: 100,
        lockTTL: 30 * 1000,
      },
    },
    bottleneck: {
      expiration: 60 * 1000,
    },
    startup: {
      debounce: 10 * 1000,
    },
    worker: {
      lockDuration: 30 * 1000,
      maxStalledCount: 1000,
      stalledInterval: 10 * 1000,
    },
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
    app: true,
    agent: false,
    default: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
    clients: {
      redlock: {},
      limiter: {},
      queue: {},
      broadcast: {},
      cache: { keyPrefix: `cache_${appInfo.name}:` },
      io: { keyPrefix: `io_${appInfo.name}:` },
      auth: { keyPrefix: `auth_${appInfo.name}:` },
      summer: { keyPrefix: `summer_${appInfo.name}:` },
    },
  };

  // onerror
  config.onerror = {
    appErrorFilter(err, ctx) {
      // 422
      if (err && err.code === 422 && !ctx.app.meta.isTest) return false;
      // 423
      if (err && err.code === 423 && !ctx.app.meta.isTest) return false;
      // 403
      if (err && err.code === 403) {
        const user = ctx && ctx.state && ctx.state.user;
        if (user && user.op.anonymous) {
          err.code = 401;
          err.status = 401;
        }
        // should show error for more scenes
        // if (!ctx.app.meta.isTest) return false;
      }
      return true;
    },
    json(err) {
      const status = detectStatus(err);

      this.status = status;
      const code = err.code || err.type;
      const message = detectErrorMessage(this, err);

      // json error
      const errorJson = {
        code,
        message,
        errors: err.errors,
      } as any;

      if (status >= 500 && !this.app.meta.isProd) {
        // provide detail error stack in local env
        errorJson.stack = err.stack;
        errorJson.name = err.name;
        for (const key in err) {
          if (!errorJson[key]) {
            errorJson[key] = err[key];
          }
        }
      }

      this.body = errorJson;
    },
  };

  return config;
}

function getFullPath(ctx, dir, filename, _options) {
  const parts = filename.split(path.sep);
  const wordFirst = parts.shift();
  // public
  if (wordFirst === 'public') {
    const fullPath = path.normalize(path.join(dir, parts.join(path.sep)));
    // files that can be accessd should be under options.dir
    if (fullPath.indexOf(dir) !== 0) return null;
    return fullPath;
  }
  // static
  const moduleRelativeName = `${wordFirst}-${parts.shift()}`;
  const module = ctx.app.meta.modules[moduleRelativeName];
  if (!module) return null;
  const staticPath = path.join(module.root, 'static');
  const fullPath = path.normalize(path.join(staticPath, parts.join(path.sep)));
  // files that can be accessd should be under options.dir
  if (fullPath.indexOf(staticPath) !== 0) return null;
  return fullPath;
}
