import knex from 'knex';
import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADb extends BeanScopeBase {}

export interface ScopeModuleADb
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
    'a-db': ScopeModuleADb;
  }

  export interface IBeanScopeConfig {
    'a-db': ReturnType<typeof config>;
  }

  export interface CabloyConfig {
    database: {
      defaultClient: string;
      clients: Record<string, knex.Knex.Config>;
      base: knex.Knex.Config;
    };
  }
}
