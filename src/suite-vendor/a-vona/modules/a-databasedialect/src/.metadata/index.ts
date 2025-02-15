/** databaseDialect: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { DatabaseDialectMysql2 } from '../bean/databaseDialect.mysql2.js';
/** databaseDialect: end */
/** databaseDialect: begin */
import type { DatabaseDialectMysql } from '../bean/databaseDialect.mysql.js';
import type { DatabaseDialectPg } from '../bean/databaseDialect.pg.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/databaseDialect.mysql2.js';
/** databaseDialect: begin */
export * from '../bean/databaseDialect.mysql.js';
export * from '../bean/databaseDialect.pg.js';
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
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-databasedialect.databaseDialect.mysql': DatabaseDialectMysql;
    'a-databasedialect.databaseDialect.mysql2': DatabaseDialectMysql2;
    'a-databasedialect.databaseDialect.pg': DatabaseDialectPg;
  }
}

@Scope()
export class ScopeModuleADatabasedialect extends BeanScopeBase {}

export interface ScopeModuleADatabasedialect {
  util: BeanScopeUtil;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-databasedialect': ScopeModuleADatabasedialect;
  }

  export interface IBeanScopeContainer {
    databasedialect: ScopeModuleADatabasedialect;
  }
}

/** scope: end */
