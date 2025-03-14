import type { IModuleMain, PowerPartial, VonaApplication, VonaContext } from 'vona';
import type { ConfigDatabase } from './types/config.ts';
import { BeanSimple, combineConfigDefault, deepExtend } from 'vona';
import { ExtendKnex } from './extend/index.ts';
import { ServiceDbMeta } from './service/dbMeta.ts';

const DATABASEMETA = Symbol('Context#__databasemeta');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    // config
    const _configDefault = await combineConfigDefault<ConfigDatabase>(this.app, configDefault, configLocal, configProd, configTest);
    this.app.config.database = deepExtend({}, _configDefault, this.app.config.database);
  }

  async moduleLoaded() {
    // ExtendKnex
    ExtendKnex(this.app);
    // db
    Object.defineProperty(this.app.context, 'db', {
      enumerable: false,
      get(this: VonaContext) {
        return this.dbMeta.transaction.inTransaction
          ? this.dbMeta.transaction.connection
          : this.app.bean.database.getDefault();
      },
    });
    // dbOriginal
    Object.defineProperty(this.app.context, 'dbOriginal', {
      enumerable: false,
      get(this: VonaContext) {
        return this.dbMeta.transaction.inTransaction
          ? this.dbMeta.transaction.db
          : this.app.bean.database.getDefault();
      },
    });
    // dbMeta
    Object.defineProperty(this.app.context, 'dbMeta', {
      enumerable: false,
      get(this: VonaContext) {
        if (!this[DATABASEMETA]) {
          this[DATABASEMETA] = this.bean._newBean(ServiceDbMeta);
        }
        return this[DATABASEMETA];
      },
      set(metaCaller: ServiceDbMeta) {
        // transaction
        if (metaCaller.transaction.inTransaction) {
          this.dbMeta.master = false; // false only on metaCaller.transaction=true
          this.dbMeta.transaction = metaCaller.transaction;
        }
      },
    });
    // transaction
    Object.defineProperty(this.app.context, 'transaction', {
      enumerable: false,
      get(this: VonaContext) {
        return this.dbMeta.transaction;
      },
    });
  }

  async configLoaded(_config) {}
}

export async function configDefault(_app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    testDatabase: false,
    defaultClient: process.env.DATABASE_DEFAULT_CLIENT,
    clients: {
      pg: {
        client: 'pg',
        connection: {
          host: process.env.DATABASE_CLIENT_PG_HOST,
          port: Number.parseInt(process.env.DATABASE_CLIENT_PG_PORT!),
          user: process.env.DATABASE_CLIENT_PG_USER,
          password: process.env.DATABASE_CLIENT_PG_PASSWORD,
          database: process.env.DATABASE_CLIENT_PG_DATABASE,
        },
      },
      mysql: {
        client: 'mysql2',
        connection: {
          host: process.env.DATABASE_CLIENT_MYSQL_HOST,
          port: Number.parseInt(process.env.DATABASE_CLIENT_MYSQL_PORT!),
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
}

async function configLocal(_app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
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
