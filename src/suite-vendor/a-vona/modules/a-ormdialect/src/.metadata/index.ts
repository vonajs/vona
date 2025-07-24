/* eslint-disable */
/** databaseDialect: begin */
export * from '../bean/databaseDialect.mysql.ts';
export * from '../bean/databaseDialect.mysql3.ts';
export * from '../bean/databaseDialect.pg.ts';

import 'vona';
declare module 'vona' {
  
    export interface IDatabaseDialectRecord {
      'a-ormdialect:mysql': never;
'a-ormdialect:mysql3': never;
'a-ormdialect:pg': never;
    }

  
}
declare module 'vona-module-a-ormdialect' {
  
        export interface DatabaseDialectMysql {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        }

          export interface DatabaseDialectMysql {
            get $beanFullName(): 'a-ormdialect.databaseDialect.mysql';
            get $onionName(): 'a-ormdialect:mysql';
          }

        export interface DatabaseDialectPg {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        }

          export interface DatabaseDialectPg {
            get $beanFullName(): 'a-ormdialect.databaseDialect.pg';
            get $onionName(): 'a-ormdialect:pg';
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
export class ScopeModuleADatabasedialect extends BeanScopeBase {}

export interface ScopeModuleADatabasedialect {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-ormdialect': ScopeModuleADatabasedialect;
  }

  export interface IBeanScopeContainer {
    databasedialect: ScopeModuleADatabasedialect;
  }
  
  

  
}

/** scope: end */
