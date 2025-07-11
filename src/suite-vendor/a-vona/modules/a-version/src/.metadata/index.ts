/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-database';
import type { TypeEntityMeta } from 'vona-module-a-database';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** entity: begin */
export * from '../entity/version.ts';
export * from '../entity/versionInit.ts';
export * from '../entity/viewRecord.ts';
import type { IEntityOptionsVersion } from '../entity/version.ts';
import type { IEntityOptionsVersionInit } from '../entity/versionInit.ts';
import type { IEntityOptionsViewRecord } from '../entity/viewRecord.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'a-version:version': IEntityOptionsVersion;
'a-version:versionInit': IEntityOptionsVersionInit;
'a-version:viewRecord': IEntityOptionsViewRecord;
    }

  
}
declare module 'vona-module-a-version' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityVersion } from '../entity/version.ts';
import type { EntityVersionInit } from '../entity/versionInit.ts';
import type { EntityViewRecord } from '../entity/viewRecord.ts';
export interface IModuleEntity {
  'version': EntityVersionMeta;
'versionInit': EntityVersionInitMeta;
'viewRecord': EntityViewRecordMeta;
}
/** entity: end */
/** entity: begin */
export type EntityVersionTableName = 'aVersion';
export type EntityVersionInitTableName = 'aVersionInit';
export type EntityViewRecordTableName = 'aViewRecord';
export type EntityVersionMeta=TypeEntityMeta<EntityVersion,EntityVersionTableName>;
export type EntityVersionInitMeta=TypeEntityMeta<EntityVersionInit,EntityVersionInitTableName>;
export type EntityViewRecordMeta=TypeEntityMeta<EntityViewRecord,EntityViewRecordTableName>;
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'aVersion': never;
'aVersionInit': never;
'aViewRecord': never;
  }
}
declare module 'vona-module-a-version' {
  
    export interface IEntityOptionsVersion {
      fields?: TypeEntityOptionsFields<EntityVersion, IEntityOptionsVersion[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsVersionInit {
      fields?: TypeEntityOptionsFields<EntityVersionInit, IEntityOptionsVersionInit[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsViewRecord {
      fields?: TypeEntityOptionsFields<EntityViewRecord, IEntityOptionsViewRecord[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/viewRecord.ts';
import type { IModelOptionsViewRecord } from '../model/viewRecord.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'a-version:viewRecord': IModelOptionsViewRecord;
    }

  
}
declare module 'vona-module-a-version' {
  
        export interface ModelViewRecord {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        } 
}
/** model: end */
/** model: begin */
import type { ModelViewRecord } from '../model/viewRecord.ts';
export interface IModuleModel {
  'viewRecord': ModelViewRecord;
}
/** model: end */
/** model: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere } from 'vona-module-a-database';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-version' {
  export interface ModelViewRecord {
      [SymbolKeyEntity]: EntityViewRecord;
      [SymbolKeyEntityMeta]: EntityViewRecordMeta;
      [SymbolKeyModelOptions]: IModelOptionsViewRecord;
      get $beanFullName(): 'a-version.model.viewRecord';
      get $onionName(): 'a-version:viewRecord';
      get<T extends IModelGetOptions<EntityViewRecord,ModelViewRecord>>(where: TypeModelWhere<EntityViewRecord>, options?: T): Promise<TypeModelRelationResult<EntityViewRecord, ModelViewRecord, T> | undefined>;
      mget<T extends IModelGetOptions<EntityViewRecord,ModelViewRecord>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityViewRecord, ModelViewRecord, T>[]>;
      select<T extends IModelSelectParams<EntityViewRecord,ModelViewRecord,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityViewRecord, ModelViewRecord, T>[]>;
      count<T extends IModelCountParams<EntityViewRecord,ModelViewRecord,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
}
declare module 'vona-module-a-database' {
  export interface IModelClassRecord {
    'a-version:viewRecord': ModelViewRecord;
  }
}
/** model: end */
/** service: begin */
export * from '../service/database.ts';
export * from '../service/version.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-version:database': never;
'a-version:version': never;
    }

  
}
declare module 'vona-module-a-version' {
  
        export interface ServiceDatabase {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        }

        export interface ServiceVersion {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        } 
}
/** service: end */
/** service: begin */
import type { ServiceDatabase } from '../service/database.ts';
import type { ServiceVersion } from '../service/version.ts';
export interface IModuleService {
  'database': ServiceDatabase;
'version': ServiceVersion;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-version.service.database': ServiceDatabase;
'a-version.service.version': ServiceVersion;
  }
}
/** service: end */
/** event: begin */
export * from '../bean/event.versionDone.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-version' {
  
        export interface EventVersionDone {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        } 
}
/** event: end */
/** event: begin */
import type { EventVersionDone } from '../bean/event.versionDone.ts';
export interface IModuleEvent {
  'versionDone': EventVersionDone;
}
/** event: end */
/** event: begin */
import type { TypeEventVersionDoneData, TypeEventVersionDoneResult } from '../bean/event.versionDone.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-version:versionDone': EventOn<TypeEventVersionDoneData, TypeEventVersionDoneResult>;
  }
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.version.ts';

import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'a-version:version': never;
    }

  
}
declare module 'vona-module-a-version' {
  
        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        } 
}
/** meta: end */
/** startup: begin */
export * from '../bean/startup.databaseInit.ts';
export * from '../bean/startup.databaseName.ts';
export * from '../bean/startup.instanceInit.ts';

import { type IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  
    export interface IStartupRecord {
      'a-version:databaseInit': IDecoratorStartupOptions;
'a-version:databaseName': IDecoratorStartupOptions;
'a-version:instanceInit': IDecoratorStartupOptions;
    }

  
}
declare module 'vona-module-a-version' {
  
        export interface StartupDatabaseInit {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        }

        export interface StartupDatabaseName {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        }

        export interface StartupInstanceInit {
          /** @internal */
          get scope(): ScopeModuleAVersion;
        } 
}
/** startup: end */
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
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleErrors, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAVersion extends BeanScopeBase {}

export interface ScopeModuleAVersion {
  util: BeanScopeUtil;
error: TypeModuleErrors<typeof Errors>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
model: IModuleModel;
service: IModuleService;
event: IModuleEvent;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-version': ScopeModuleAVersion;
  }

  export interface IBeanScopeContainer {
    version: ScopeModuleAVersion;
  }
  
  

  export interface IBeanScopeLocale {
    'a-version': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-version::${K}` {
  return `a-version::${key}`;
}
/** scope: end */
