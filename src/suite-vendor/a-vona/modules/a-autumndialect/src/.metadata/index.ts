/* eslint-disable */
/** databaseDialect: begin */
export * from '../bean/databaseDialect.mysql.ts';
export * from '../bean/databaseDialect.mysql3.ts';
export * from '../bean/databaseDialect.pg.ts';

import 'vona';
declare module 'vona' {
  
    export interface IDatabaseDialectRecord {
      'a-autumndialect:mysql': never;
'a-autumndialect:mysql3': never;
'a-autumndialect:pg': never;
    }

  
}
declare module 'vona-module-a-autumndialect' {
  
        export interface DatabaseDialectMysql {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        }

          export interface DatabaseDialectMysql {
            get $beanFullName(): 'a-autumndialect.databaseDialect.mysql';
            get $onionName(): 'a-autumndialect:mysql';
          }

        export interface DatabaseDialectPg {
          /** @internal */
          get scope(): ScopeModuleADatabasedialect;
        }

          export interface DatabaseDialectPg {
            get $beanFullName(): 'a-autumndialect.databaseDialect.pg';
            get $onionName(): 'a-autumndialect:pg';
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
    'a-autumndialect.databaseDialect.mysql': DatabaseDialectMysql;
'a-autumndialect.databaseDialect.mysql3': DatabaseDialectMysql3;
'a-autumndialect.databaseDialect.pg': DatabaseDialectPg;
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
    'a-autumndialect': ScopeModuleADatabasedialect;
  }

  export interface IBeanScopeContainer {
    databasedialect: ScopeModuleADatabasedialect;
  }
  
  

  
}

/** scope: end */
