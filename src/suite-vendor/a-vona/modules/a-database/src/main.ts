import type { IModuleMain, PowerPartial, VonaApplication, VonaContext } from 'vona';
import type { ConfigDatabase } from './types/config.ts';
import type { IDatabaseClientRecord } from './types/database.ts';
import { BeanSimple, combineConfigDefault, deepExtend } from 'vona';
import { ExtendKnex } from './extend/index.ts';
import { ServiceDbMeta } from './service/dbMeta.ts';

const SymbolDbMeta = Symbol('SymbolDbMeta');
const SymbolDbLevel = Symbol('SymbolDbLevel');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    // config
    const _configDefault = await combineConfigDefault<ConfigDatabase>(this.app, configDefault, configLocal, configProd, configTest);
    this.app.config.database = deepExtend({}, _configDefault, this.app.config.database);
  }

  async moduleLoaded() {
    // ExtendKnex
    ExtendKnex(this.app);
    // dbLevel
    Object.defineProperty(this.app.context, 'dbLevel', {
      enumerable: false,
      get(this: VonaContext) {
        return this[SymbolDbLevel] ?? 0;
      },
      set(value: number | undefined) {
        this[SymbolDbLevel] = value;
      },
    });
    // dbMeta
    Object.defineProperty(this.app.context, 'dbMeta', {
      enumerable: false,
      get(this: VonaContext) {
        if (!this[SymbolDbMeta]) {
          this[SymbolDbMeta] = this.bean._newBean(ServiceDbMeta);
        }
        return this[SymbolDbMeta];
      },
      set(value: ServiceDbMeta) {
        this[SymbolDbMeta] = value;
      },
    });
  }

  async configLoaded(_config) {}
}

export async function configDefault(_app: VonaApplication): Promise<PowerPartial<ConfigDatabase>> {
  return {
    testDatabase: false,
    defaultClient: process.env.DATABASE_DEFAULT_CLIENT as keyof IDatabaseClientRecord,
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
