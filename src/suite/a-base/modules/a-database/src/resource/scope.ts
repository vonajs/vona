import knex from 'knex';
import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal, LocalTransaction } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';
import { LocalDbMeta } from '../local/local.dbMeta.js';

@Scope()
export class ScopeModuleADatabase extends BeanScopeBase {}

export interface ScopeModuleADatabase
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales,
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-database': ScopeModuleADatabase;
  }

  export interface IBeanScopeConfig {
    'a-database': ReturnType<typeof config>;
  }

  export interface CabloyConfig {
    database: {
      defaultClient: string;
      clients: Record<string, knex.Knex.Config>;
      base: knex.Knex.Config;
      bases: Record<string, knex.Knex.Config>;
    };
  }

  export interface CabloyContext {
    get db(): knex.Knex | knex.Knex.Transaction;
    get dbMeta(): LocalDbMeta;
    set dbMeta(value: LocalDbMeta);
    get transaction(): LocalTransaction;
  }
}
