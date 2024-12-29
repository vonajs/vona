/** databaseDialect: begin */
export * from '../bean/databaseDialect.mysql.js';
export * from '../bean/databaseDialect.mysql2.js';
export * from '../bean/databaseDialect.pg.js';

import 'vona';
declare module 'vona' {
  export interface IDatabaseDialectRecord {
    'a-databasedialect:mysql': never;
    'a-databasedialect:mysql2': never;
    'a-databasedialect:pg': never;
  }
}
declare module 'vona-module-a-databasedialect' {
  export interface DatabaseDialectMysql {
    /** @internal */
    get scope(): ScopeModuleADatabasedialect;
  }

  export interface DatabaseDialectMysql2 {
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
import { DatabaseDialectMysql } from '../bean/databaseDialect.mysql.js';
import { DatabaseDialectMysql2 } from '../bean/databaseDialect.mysql2.js';
import { DatabaseDialectPg } from '../bean/databaseDialect.pg.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-databasedialect.databaseDialect.mysql': DatabaseDialectMysql;
    'a-databasedialect.databaseDialect.mysql2': DatabaseDialectMysql2;
    'a-databasedialect.databaseDialect.pg': DatabaseDialectPg;
  }
}
/** databaseDialect: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
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
