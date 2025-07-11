/* eslint-disable */
/** databaseDialect: begin */
export * from '../bean/databaseDialect.mysql.ts';
export * from '../bean/databaseDialect.mysql3.ts';
export * from '../bean/databaseDialect.pg.ts';

import 'vona';
declare module 'vona' {
  
    export interface IDatabaseDialectRecord {
      'a-databasedialect:mysql': never;
'a-databasedialect:mysql3': never;
'a-databasedialect:pg': never;
    }

  
}
declare module 'vona-module-a-databasedialect' {
  
        export interface DatabaseDialectMysql {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        }

        export interface DatabaseDialectMysql3 {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        }

        export interface DatabaseDialectPg {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        } 
}
/** databaseDialect: end */
/** databaseDialect: begin */
import type { DatabaseDialectMysql } from '../bean/databaseDialect.mysql.ts';
import type { DatabaseDialectMysql3 } from '../bean/databaseDialect.mysql3.ts';
import type { DatabaseDialectPg } from '../bean/databaseDialect.pg.ts';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-databasedialect.databaseDialect.mysql': DatabaseDialectMysql;
'a-databasedialect.databaseDialect.mysql3': DatabaseDialectMysql3;
'a-databasedialect.databaseDialect.pg': DatabaseDialectPg;
  }
}
/** databaseDialect: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleADatabasedialect extends BeanScopeBase {}

export interface ScopeModuleADatabasedialect {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-databasedialect': ScopeModuleADatabasedialect;
  }

  export interface IBeanScopeContainer {
    databasedialect: ScopeModuleADatabasedialect;
  }
  
  

  
}

/** scope: end */
