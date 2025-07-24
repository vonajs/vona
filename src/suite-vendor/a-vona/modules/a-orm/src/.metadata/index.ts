/* eslint-disable */
/** aopMethod: begin */
export * from '../bean/aopMethod.transaction.ts';
import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IAopMethodRecord {
      'a-orm:transaction': IAopMethodOptionsTransaction;
    }

  
}
declare module 'vona-module-a-orm' {
  
        export interface AopMethodTransaction {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface AopMethodTransaction {
            get $beanFullName(): 'a-orm.aopMethod.transaction';
            get $onionName(): 'a-orm:transaction';
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
declare module 'vona-module-a-orm' {
  
        export interface BeanDatabase {
          /** @internal */
          get scope(): ScopeModuleAOrm;
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
export * from '../service/cacheEntity_.ts';
export * from '../service/cacheQuery_.ts';
export * from '../service/columnsCache_.ts';
export * from '../service/columns_.ts';
export * from '../service/database.ts';
export * from '../service/databaseAsyncLocalStorage_.ts';
export * from '../service/databaseClient_.ts';
export * from '../service/db_.ts';
export * from '../service/entityResolver_.ts';
export * from '../service/modelResolver_.ts';
export * from '../service/relations_.ts';
export * from '../service/transactionAsyncLocalStorage_.ts';
export * from '../service/transactionConsistency‌_.ts';
export * from '../service/transactionFiber_.ts';
export * from '../service/transactionState_.ts';
export * from '../service/transaction_.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-orm:database': never;
    }

  
}
declare module 'vona-module-a-orm' {
  
        export interface ServiceDatabase {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface ServiceDatabase {
            get $beanFullName(): 'a-orm.service.database';
            get $onionName(): 'a-orm:database';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceDatabase } from '../service/database.ts';
export interface IModuleService {
  'database': ServiceDatabase;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-orm.service.database': ServiceDatabase;
  }
}
/** service: end */
/** broadcast: begin */
export * from '../bean/broadcast.columnsClear.ts';
export * from '../bean/broadcast.databaseClientReload.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  
    export interface IBroadcastRecord {
      'a-orm:columnsClear': IDecoratorBroadcastOptions;
'a-orm:databaseClientReload': IDecoratorBroadcastOptions;
    }

  
}
declare module 'vona-module-a-orm' {
  
        export interface BroadcastColumnsClear {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface BroadcastColumnsClear {
            get $beanFullName(): 'a-orm.broadcast.columnsClear';
            get $onionName(): 'a-orm:columnsClear';
          }

        export interface BroadcastDatabaseClientReload {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface BroadcastDatabaseClientReload {
            get $beanFullName(): 'a-orm.broadcast.databaseClientReload';
            get $onionName(): 'a-orm:databaseClientReload';
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
declare module 'vona-module-a-orm' {
  
        export interface EventClientNameReal {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface EventClientNameReal {
            get $beanFullName(): 'a-orm.event.clientNameReal';
            get $onionName(): 'a-orm:clientNameReal';
          }

        export interface EventColumnsClear {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface EventColumnsClear {
            get $beanFullName(): 'a-orm.event.columnsClear';
            get $onionName(): 'a-orm:columnsClear';
          }

        export interface EventDatabaseClientReload {
          /** @internal */
          get scope(): ScopeModuleAOrm;
        }

          export interface EventDatabaseClientReload {
            get $beanFullName(): 'a-orm.event.databaseClientReload';
            get $onionName(): 'a-orm:databaseClientReload';
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
    'a-orm:clientNameReal': EventOn<TypeEventClientNameRealData, TypeEventClientNameRealResult>;
'a-orm:columnsClear': EventOn<TypeEventColumnsClearData, TypeEventColumnsClearResult>;
'a-orm:databaseClientReload': EventOn<TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult>;
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
export class ScopeModuleAOrm extends BeanScopeBase {}

export interface ScopeModuleAOrm {
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
    'a-orm': ScopeModuleAOrm;
  }

  export interface IBeanScopeContainer {
    orm: ScopeModuleAOrm;
  }
  
  export interface IBeanScopeConfig {
    'a-orm': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-orm': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-orm::${K}` {
  return `a-orm::${key}`;
}
/** scope: end */
