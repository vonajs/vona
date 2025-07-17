/* eslint-disable */
/** aopMethod: begin */
export * from '../bean/aopMethod.transaction.ts';
import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IAopMethodRecord {
      'a-database:transaction': IAopMethodOptionsTransaction;
    }

  
}
declare module 'vona-module-a-database' {
  
        export interface AopMethodTransaction {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface AopMethodTransaction {
            get $beanFullName(): 'a-database.aopMethod.transaction';
            get $onionName(): 'a-database:transaction';
          } 
}
/** aopMethod: end */
/** bean: begin */
export * from '../bean/bean.database.ts';
export * from '../bean/bean.databaseDialectBase.ts';
export * from '../bean/bean.model.ts';
export * from '../bean/bean.modelBase.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-database' {
  
        export interface BeanDatabase {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanDatabase } from '../bean/bean.database.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'database': BeanDatabase;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/cacheEntity.ts';
export * from '../service/cacheQuery.ts';
export * from '../service/columns.ts';
export * from '../service/columnsCache.ts';
export * from '../service/database.ts';
export * from '../service/databaseAsyncLocalStorage.ts';
export * from '../service/databaseClient.ts';
export * from '../service/db_.ts';
export * from '../service/entityResolver.ts';
export * from '../service/modelResolver.ts';
export * from '../service/relations.ts';
export * from '../service/transaction.ts';
export * from '../service/transactionAsyncLocalStorage.ts';
export * from '../service/transactionChain.ts';
export * from '../service/transactionConsistency‌.ts';
export * from '../service/transactionState.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-database:cacheEntity': never;
'a-database:cacheQuery': never;
'a-database:columns': never;
'a-database:columnsCache': never;
'a-database:database': never;
'a-database:databaseAsyncLocalStorage': never;
'a-database:databaseClient': never;
'a-database:entityResolver': never;
'a-database:modelResolver': never;
'a-database:relations': never;
'a-database:transaction': never;
'a-database:transactionAsyncLocalStorage': never;
'a-database:transactionChain': never;
'a-database:transactionConsistency‌': never;
'a-database:transactionState': never;
    }

  
}
declare module 'vona-module-a-database' {
  
        export interface ServiceCacheEntity {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceCacheEntity {
            get $beanFullName(): 'a-database.service.cacheEntity';
            get $onionName(): 'a-database:cacheEntity';
          }

        export interface ServiceCacheQuery {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceCacheQuery {
            get $beanFullName(): 'a-database.service.cacheQuery';
            get $onionName(): 'a-database:cacheQuery';
          }

        export interface ServiceColumns {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceColumns {
            get $beanFullName(): 'a-database.service.columns';
            get $onionName(): 'a-database:columns';
          }

        export interface ServiceColumnsCache {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceColumnsCache {
            get $beanFullName(): 'a-database.service.columnsCache';
            get $onionName(): 'a-database:columnsCache';
          }

        export interface ServiceDatabase {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceDatabase {
            get $beanFullName(): 'a-database.service.database';
            get $onionName(): 'a-database:database';
          }

        export interface ServiceDatabaseAsyncLocalStorage {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceDatabaseAsyncLocalStorage {
            get $beanFullName(): 'a-database.service.databaseAsyncLocalStorage';
            get $onionName(): 'a-database:databaseAsyncLocalStorage';
          }

        export interface ServiceDatabaseClient {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceDatabaseClient {
            get $beanFullName(): 'a-database.service.databaseClient';
            get $onionName(): 'a-database:databaseClient';
          }

        export interface ServiceEntityResolver {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceEntityResolver {
            get $beanFullName(): 'a-database.service.entityResolver';
            get $onionName(): 'a-database:entityResolver';
          }

        export interface ServiceModelResolver {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceModelResolver {
            get $beanFullName(): 'a-database.service.modelResolver';
            get $onionName(): 'a-database:modelResolver';
          }

        export interface ServiceRelations {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceRelations {
            get $beanFullName(): 'a-database.service.relations';
            get $onionName(): 'a-database:relations';
          }

        export interface ServiceTransaction {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceTransaction {
            get $beanFullName(): 'a-database.service.transaction';
            get $onionName(): 'a-database:transaction';
          }

        export interface ServiceTransactionAsyncLocalStorage {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceTransactionAsyncLocalStorage {
            get $beanFullName(): 'a-database.service.transactionAsyncLocalStorage';
            get $onionName(): 'a-database:transactionAsyncLocalStorage';
          }

        export interface ServiceTransactionChain {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceTransactionChain {
            get $beanFullName(): 'a-database.service.transactionChain';
            get $onionName(): 'a-database:transactionChain';
          }

        export interface ServiceTransactionConsistency‌ {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceTransactionConsistency‌ {
            get $beanFullName(): 'a-database.service.transactionConsistency‌';
            get $onionName(): 'a-database:transactionConsistency‌';
          }

        export interface ServiceTransactionState {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface ServiceTransactionState {
            get $beanFullName(): 'a-database.service.transactionState';
            get $onionName(): 'a-database:transactionState';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceCacheEntity } from '../service/cacheEntity.ts';
import type { ServiceCacheQuery } from '../service/cacheQuery.ts';
import type { ServiceColumns } from '../service/columns.ts';
import type { ServiceColumnsCache } from '../service/columnsCache.ts';
import type { ServiceDatabase } from '../service/database.ts';
import type { ServiceDatabaseAsyncLocalStorage } from '../service/databaseAsyncLocalStorage.ts';
import type { ServiceDatabaseClient } from '../service/databaseClient.ts';
import type { ServiceEntityResolver } from '../service/entityResolver.ts';
import type { ServiceModelResolver } from '../service/modelResolver.ts';
import type { ServiceRelations } from '../service/relations.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
import type { ServiceTransactionAsyncLocalStorage } from '../service/transactionAsyncLocalStorage.ts';
import type { ServiceTransactionChain } from '../service/transactionChain.ts';
import type { ServiceTransactionConsistency‌ } from '../service/transactionConsistency‌.ts';
import type { ServiceTransactionState } from '../service/transactionState.ts';
export interface IModuleService {
  'cacheEntity': ServiceCacheEntity;
'cacheQuery': ServiceCacheQuery;
'columns': ServiceColumns;
'columnsCache': ServiceColumnsCache;
'database': ServiceDatabase;
'databaseAsyncLocalStorage': ServiceDatabaseAsyncLocalStorage;
'databaseClient': ServiceDatabaseClient;
'entityResolver': ServiceEntityResolver;
'modelResolver': ServiceModelResolver;
'relations': ServiceRelations;
'transaction': ServiceTransaction;
'transactionAsyncLocalStorage': ServiceTransactionAsyncLocalStorage;
'transactionChain': ServiceTransactionChain;
'transactionConsistency‌': ServiceTransactionConsistency‌;
'transactionState': ServiceTransactionState;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-database.service.cacheEntity': ServiceCacheEntity;
'a-database.service.cacheQuery': ServiceCacheQuery;
'a-database.service.columns': ServiceColumns;
'a-database.service.columnsCache': ServiceColumnsCache;
'a-database.service.database': ServiceDatabase;
'a-database.service.databaseAsyncLocalStorage': ServiceDatabaseAsyncLocalStorage;
'a-database.service.databaseClient': ServiceDatabaseClient;
'a-database.service.entityResolver': ServiceEntityResolver;
'a-database.service.modelResolver': ServiceModelResolver;
'a-database.service.relations': ServiceRelations;
'a-database.service.transaction': ServiceTransaction;
'a-database.service.transactionAsyncLocalStorage': ServiceTransactionAsyncLocalStorage;
'a-database.service.transactionChain': ServiceTransactionChain;
'a-database.service.transactionConsistency‌': ServiceTransactionConsistency‌;
'a-database.service.transactionState': ServiceTransactionState;
  }
}
/** service: end */
/** broadcast: begin */
export * from '../bean/broadcast.columnsClear.ts';
export * from '../bean/broadcast.databaseClientReload.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  
    export interface IBroadcastRecord {
      'a-database:columnsClear': IDecoratorBroadcastOptions;
'a-database:databaseClientReload': IDecoratorBroadcastOptions;
    }

  
}
declare module 'vona-module-a-database' {
  
        export interface BroadcastColumnsClear {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface BroadcastColumnsClear {
            get $beanFullName(): 'a-database.broadcast.columnsClear';
            get $onionName(): 'a-database:columnsClear';
          }

        export interface BroadcastDatabaseClientReload {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface BroadcastDatabaseClientReload {
            get $beanFullName(): 'a-database.broadcast.databaseClientReload';
            get $onionName(): 'a-database:databaseClientReload';
          } 
}
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastColumnsClear } from '../bean/broadcast.columnsClear.ts';
import type { BroadcastDatabaseClientReload } from '../bean/broadcast.databaseClientReload.ts';
export interface IModuleBroadcast {
  'columnsClear': BroadcastColumnsClear;
'databaseClientReload': BroadcastDatabaseClientReload;
}
/** broadcast: end */
/** event: begin */
export * from '../bean/event.clientNameReal.ts';
export * from '../bean/event.columnsClear.ts';
export * from '../bean/event.databaseClientReload.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-database' {
  
        export interface EventClientNameReal {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface EventClientNameReal {
            get $beanFullName(): 'a-database.event.clientNameReal';
            get $onionName(): 'a-database:clientNameReal';
          }

        export interface EventColumnsClear {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface EventColumnsClear {
            get $beanFullName(): 'a-database.event.columnsClear';
            get $onionName(): 'a-database:columnsClear';
          }

        export interface EventDatabaseClientReload {
          /** @internal */
          get scope(): ScopeModuleADatabase;
        }

          export interface EventDatabaseClientReload {
            get $beanFullName(): 'a-database.event.databaseClientReload';
            get $onionName(): 'a-database:databaseClientReload';
          } 
}
/** event: end */
/** event: begin */
import type { EventClientNameReal } from '../bean/event.clientNameReal.ts';
import type { EventColumnsClear } from '../bean/event.columnsClear.ts';
import type { EventDatabaseClientReload } from '../bean/event.databaseClientReload.ts';
export interface IModuleEvent {
  'clientNameReal': EventClientNameReal;
'columnsClear': EventColumnsClear;
'databaseClientReload': EventDatabaseClientReload;
}
/** event: end */
/** event: begin */
import type { TypeEventClientNameRealData, TypeEventClientNameRealResult } from '../bean/event.clientNameReal.ts';
import type { TypeEventColumnsClearData, TypeEventColumnsClearResult } from '../bean/event.columnsClear.ts';
import type { TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult } from '../bean/event.databaseClientReload.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-database:clientNameReal': EventOn<TypeEventClientNameRealData, TypeEventClientNameRealResult>;
'a-database:columnsClear': EventOn<TypeEventColumnsClearData, TypeEventColumnsClearResult>;
'a-database:databaseClientReload': EventOn<TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult>;
  }
}
/** event: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
import type { Errors } from '../config/errors.ts';
/** error: end */
/** main: begin */
export * from '../main.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleErrors, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleADatabase extends BeanScopeBase {}

export interface ScopeModuleADatabase {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
error: TypeModuleErrors<typeof Errors>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
service: IModuleService;
broadcast: IModuleBroadcast;
event: IModuleEvent;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-database': ScopeModuleADatabase;
  }

  export interface IBeanScopeContainer {
    database: ScopeModuleADatabase;
  }
  
  export interface IBeanScopeConfig {
    'a-database': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-database': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-database::${K}` {
  return `a-database::${key}`;
}
/** scope: end */
