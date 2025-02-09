/** broadcast: begin */
export * from '../bean/broadcast.columnsClear.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
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
/** broadcast: end */
/** broadcast: begin */
import { BroadcastColumnsClear } from '../bean/broadcast.columnsClear.js';
export interface IModuleBroadcast {
  columnsClear: BroadcastColumnsClear;
}
/** broadcast: end */
/** entity: begin */
export * from '../entity/version.js';
export * from '../entity/versionInit.js';
export * from '../entity/viewRecord.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-version:version': IDecoratorEntityOptions;
    'a-version:versionInit': IDecoratorEntityOptions;
    'a-version:viewRecord': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-version' {}
/** entity: end */
/** entity: begin */
import { EntityVersion } from '../entity/version.js';
import { EntityVersionInit } from '../entity/versionInit.js';
import { EntityViewRecord } from '../entity/viewRecord.js';
export interface IModuleEntity {
  version: EntityVersion;
  versionInit: EntityVersionInit;
  viewRecord: EntityViewRecord;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-version' {
  export interface EntityVersion {
    column: <K extends keyof Omit<EntityVersion, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityVersion, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityVersionInit {
    column: <K extends keyof Omit<EntityVersionInit, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityVersionInit, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityViewRecord {
    column: <K extends keyof Omit<EntityViewRecord, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityViewRecord, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/viewRecord.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
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
/** model: end */
/** model: begin */
import { ModelViewRecord } from '../model/viewRecord.js';
export interface IModuleModel {
  viewRecord: ModelViewRecord;
}
/** model: end */
/** event: begin */
export * from '../bean/event.versionDone.js';

import { IDecoratorEventOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-version:versionDone': IDecoratorEventOptions;
  }
}
declare module 'vona-module-a-version' {
  export interface EventVersionDone {
    /** @internal */
    get scope(): ScopeModuleAVersion;
  }
}
/** event: end */
/** event: begin */
import { EventVersionDone } from '../bean/event.versionDone.js';
export interface IModuleEvent {
  versionDone: EventVersionDone;
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.version.js';

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
export * from '../bean/startup.databaseInit.js';
export * from '../bean/startup.databaseName.js';
export * from '../bean/startup.instanceInit.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
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
/** service: begin */
export * from '../service/database.js';
export * from '../service/version.js';

import 'vona';
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
/** service: end */
/** service: begin */
import { ServiceDatabase } from '../service/database.js';
import { ServiceVersion } from '../service/version.js';
export interface IModuleService {
  database: ServiceDatabase;
  version: ServiceVersion;
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
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleErrors, TypeModuleLocales, TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-version::${K}` {
  return `a-version::${key}`;
}
/** scope: end */
