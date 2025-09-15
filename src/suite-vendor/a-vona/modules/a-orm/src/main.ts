import type { FunctionAny, IModuleMain, PowerPartial, VonaApplication, VonaContext } from 'vona';
import type { ConfigDatabase } from './types/config.ts';
import type { IDatabaseClientRecord } from './types/database.ts';
import { BeanSimple, cast, combineConfigDefault, deepExtend } from 'vona';
import { ServiceDatabaseAsyncLocalStorage, ServiceTransactionConsistency‌ } from 'vona-module-a-orm';
import { ExtendKnex } from './extend/index.ts';

const SymbolTransactionConsistency = Symbol('SymbolTransactionConsistency');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    // config
    const _configDefault = await combineConfigDefault<ConfigDatabase>(this.app, configDefault, configDev, configProd, configTest);
    this.app.config.database = deepExtend({}, _configDefault, this.app.config.database);
  }

  async moduleLoaded() {
    // ExtendKnex
    ExtendKnex(this.app);
    // db
    Object.defineProperty(this.app.context, 'db', {
      enumerable: false,
      get(this: VonaContext) {
        return this.app.bean._getBean(ServiceDatabaseAsyncLocalStorage).current;
      },
    });
    // transactionConsistency
    Object.defineProperty(this.app.context, 'transactionConsistency', {
      enumerable: false,
      get(this: VonaContext) {
        if (!this[SymbolTransactionConsistency]) {
          this[SymbolTransactionConsistency] = this.app.bean._newBean(ServiceTransactionConsistency‌);
        }
        return this[SymbolTransactionConsistency];
      },
    });
    // commit
    Object.defineProperty(this.app.context, 'commit', {
      enumerable: false,
      get() {
        return function (this: VonaContext, cb: FunctionAny) {
          if (this.ctxCaller) {
            this.ctxCaller.commit(cb);
          } else {
            cast(this).transactionConsistency.commit(cb);
          }
        };
      },
    });
    Object.defineProperty(this.app.context, 'commitsDone', {
      enumerable: false,
      get() {
        return function (this: VonaContext) {
          return cast(this).transactionConsistency.commitsDone();
        };
      },
    });
  }

  async configLoaded(_config) {}
}

export async function configDefault(app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    testDatabase: false,
    defaultClient: app.meta.env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: app.meta.env.DATABASE_CLIENT_PG_HOST,
          port: Number.parseInt(app.meta.env.DATABASE_CLIENT_PG_PORT!),
          user: app.meta.env.DATABASE_CLIENT_PG_USER,
          password: app.meta.env.DATABASE_CLIENT_PG_PASSWORD,
          database: app.meta.env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: app.meta.env.DATABASE_CLIENT_MYSQL_HOST,
          port: Number.parseInt(app.meta.env.DATABASE_CLIENT_MYSQL_PORT!),
          user: app.meta.env.DATABASE_CLIENT_MYSQL_USER,
          password: app.meta.env.DATABASE_CLIENT_MYSQL_PASSWORD,
          database: app.meta.env.DATABASE_CLIENT_MYSQL_DATABASE,
        },
      },
    },
    base: {
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 60000 * 10,
      asyncStackTraces: true,
    },
  };
}

async function configDev(_app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    testDatabase: true,
    base: {
      pool: { min: 0, max: 1 },
    },
  };
}

async function configProd(_app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    testDatabase: false,
    base: {
      asyncStackTraces: false,
    },
  };
}

async function configTest(_app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    testDatabase: true,
    base: {
      pool: { min: 0, max: 1 },
    },
  };
}
