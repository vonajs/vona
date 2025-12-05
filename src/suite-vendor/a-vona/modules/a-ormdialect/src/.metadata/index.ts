/* eslint-disable */
/** databaseDialect: begin */
export * from '../bean/databaseDialect.betterSqlite3.ts';
export * from '../bean/databaseDialect.mysql.ts';
export * from '../bean/databaseDialect.mysql3.ts';
export * from '../bean/databaseDialect.pg.ts';

import 'vona';
declare module 'vona' {
  
    export interface IDatabaseDialectRecord {
      'a-ormdialect:betterSqlite3': never;
'a-ormdialect:mysql': never;
'a-ormdialect:mysql3': never;
'a-ormdialect:pg': never;
    }

  
}
declare module 'vona-module-a-ormdialect' {
  
        export interface DatabaseDialectBetterSqlite3 {
          /** @internal */
          get scope(): ScopeModuleAOrmdialect;
        }

          export interface DatabaseDialectBetterSqlite3 {
            get $beanFullName(): 'a-ormdialect.databaseDialect.betterSqlite3';
            get $onionName(): 'a-ormdialect:betterSqlite3';
            
          }

        export interface DatabaseDialectMysql {
          /** @internal */
          get scope(): ScopeModuleAOrmdialect;
        }

          export interface DatabaseDialectMysql {
            get $beanFullName(): 'a-ormdialect.databaseDialect.mysql';
            get $onionName(): 'a-ormdialect:mysql';
            
          }

        export interface DatabaseDialectPg {
          /** @internal */
          get scope(): ScopeModuleAOrmdialect;
        }

          export interface DatabaseDialectPg {
            get $beanFullName(): 'a-ormdialect.databaseDialect.pg';
            get $onionName(): 'a-ormdialect:pg';
            
          } 
}
/** databaseDialect: end */
/** databaseDialect: begin */
import type { DatabaseDialectBetterSqlite3 } from '../bean/databaseDialect.betterSqlite3.ts';
import type { DatabaseDialectMysql } from '../bean/databaseDialect.mysql.ts';
import type { DatabaseDialectMysql3 } from '../bean/databaseDialect.mysql3.ts';
import type { DatabaseDialectPg } from '../bean/databaseDialect.pg.ts';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-ormdialect.databaseDialect.betterSqlite3': DatabaseDialectBetterSqlite3;
'a-ormdialect.databaseDialect.mysql': DatabaseDialectMysql;
'a-ormdialect.databaseDialect.mysql3': DatabaseDialectMysql3;
'a-ormdialect.databaseDialect.pg': DatabaseDialectPg;
  }
}
/** databaseDialect: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOrmdialect extends BeanScopeBase {}

export interface ScopeModuleAOrmdialect {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-ormdialect': ScopeModuleAOrmdialect;
  }

  export interface IBeanScopeContainer {
    ormdialect: ScopeModuleAOrmdialect;
  }
  
  

  

  
}

/** scope: end */
