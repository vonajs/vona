import type { BeanScopeUtil, TypeLocaleBase, TypeModuleErrors, TypeModuleLocales } from 'vona';
/** broadcast: begin */
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';

import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import type { IDecoratorModelOptions } from 'vona-module-a-database';
import type { EventOn } from 'vona-module-a-event';
import type { IDecoratorStartupOptions } from 'vona-module-a-startup';

/** broadcast: end */
/** broadcast: begin */
import type { BroadcastColumnsClear } from '../bean/broadcast.columnsClear.ts';
/** event: end */
/** event: begin */
import type { EventVersionDone } from '../bean/event.versionDone.ts';

/** event: end */
/** event: begin */
import type { TypeEventVersionDoneData, TypeEventVersionDoneResult } from '../bean/event.versionDone.ts';
import type { Errors } from '../config/errors.ts';
/** entity: end */
/** entity: begin */
import type { EntityVersion } from '../entity/version.ts';
import type { EntityVersionInit } from '../entity/versionInit.ts';
import type { EntityViewRecord } from '../entity/viewRecord.ts';

/** model: end */
/** model: begin */
import type { ModelViewRecord } from '../model/viewRecord.ts';

/** service: end */
/** service: begin */
import type { ServiceDatabase } from '../service/database.ts';

import type { ServiceVersion } from '../service/version.ts';
/** error: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

/** service: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/broadcast.columnsClear.ts';
declare module 'vona-module-a-broadcast' {

  export interface IBroadcastRecord {
    'a-version:columnsClear': IDecoratorBroadcastOptions;
  }

}
declare module 'vona-module-a-version' {

  export interface BroadcastColumnsClear {
    /** @internal */
    get scope(): ScopeModuleAVersion;
  }
}
export interface IModuleBroadcast {
  columnsClear: BroadcastColumnsClear;
}
/** model: end */
/** event: begin */
export * from '../bean/event.versionDone.ts';
/** event: end */
/** meta: begin */
export * from '../bean/meta.version.ts';
/** meta: end */
/** startup: begin */
export * from '../bean/startup.databaseInit.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'a-version:version': IDecoratorEntityOptions;
    'a-version:versionInit': IDecoratorEntityOptions;
    'a-version:viewRecord': IDecoratorEntityOptions;
  }

}
declare module 'vona-module-a-version' {

}
export interface IModuleEntity {
  version: EntityVersion;
  versionInit: EntityVersionInit;
  viewRecord: EntityViewRecord;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-version' {

  export interface EntityVersion {
    $column: <K extends keyof Omit<EntityVersion, 'column' | 'columns' | 'table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityVersion, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityVersionInit {
    $column: <K extends keyof Omit<EntityVersionInit, 'column' | 'columns' | 'table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityVersionInit, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityViewRecord {
    $column: <K extends keyof Omit<EntityViewRecord, 'column' | 'columns' | 'table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityViewRecord, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
export * from '../bean/startup.databaseName.ts';
declare module 'vona-module-a-database' {

  export interface IModelRecord {
    'a-version:viewRecord': IDecoratorModelOptions;
  }

}
declare module 'vona-module-a-version' {

  export interface ModelViewRecord {
    /** @internal */
    get scope(): ScopeModuleAVersion;
  }
}
export interface IModuleModel {
  viewRecord: ModelViewRecord;
}
export * from '../bean/startup.instanceInit.ts';
declare module 'vona' {

}
declare module 'vona-module-a-version' {

  export interface EventVersionDone {
    /** @internal */
    get scope(): ScopeModuleAVersion;
  }
}
export interface IModuleEvent {
  versionDone: EventVersionDone;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-version:versionDone': EventOn<TypeEventVersionDoneData, TypeEventVersionDoneResult>;
  }
}
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
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
/** broadcast: end */
/** entity: begin */
export * from '../entity/version.ts';
export * from '../entity/versionInit.ts';
export * from '../entity/viewRecord.ts';
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
/** entity: end */
/** model: begin */
export * from '../model/viewRecord.ts';
/** startup: end */
/** service: begin */
export * from '../service/database.ts';
declare module 'vona-module-a-web' {

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
export interface IModuleService {
  database: ServiceDatabase;
  version: ServiceVersion;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-version.service.database': ServiceDatabase;
    'a-version.service.version': ServiceVersion;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
export * from '../service/version.ts';

@Scope()
export class ScopeModuleAVersion extends BeanScopeBase {}

export interface ScopeModuleAVersion {
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  broadcast: IModuleBroadcast;
  entity: IModuleEntity;
  model: IModuleModel;
  event: IModuleEvent;
  service: IModuleService;
}
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
