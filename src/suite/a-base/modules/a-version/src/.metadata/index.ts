/** beans: begin */
export * from '../bean/bean.worker.js';
export * from '../bean/broadcast.columnsClear.js';
export * from '../bean/version.manager.js';
import { BeanWorker } from '../bean/bean.worker.js';
import { BroadcastColumnsClear } from '../bean/broadcast.columnsClear.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    worker: BeanWorker;
  }

  export interface IBeanRecordGeneral {
    'a-version.broadcast.columnsClear': BroadcastColumnsClear;
    'a-version.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-version' {
  export interface BeanWorker {
    get scope(): ScopeModuleAVersion;
  }

  export interface BroadcastColumnsClear {
    get scope(): ScopeModuleAVersion;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAVersion;
  }
}
/** beans: end */
/** startup: begin */
export * from '../bean/startup.databaseInit.js';
export * from '../bean/startup.databaseName.js';
export * from '../bean/startup.instanceInit.js';
export * from '../bean/startup.workerAlive.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'a-version:databaseInit': IDecoratorStartupOptions;
    'a-version:databaseName': IDecoratorStartupOptions;
    'a-version:instanceInit': IDecoratorStartupOptions;
    'a-version:workerAlive': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-version' {
  export interface StartupDatabaseInit {
    get scope(): ScopeModuleAVersion;
  }

  export interface StartupDatabaseName {
    get scope(): ScopeModuleAVersion;
  }

  export interface StartupInstanceInit {
    get scope(): ScopeModuleAVersion;
  }

  export interface StartupWorkerAlive {
    get scope(): ScopeModuleAVersion;
  }
}
/** startup: end */
/** entity: begin */
export * from '../entity/version.js';
export * from '../entity/versionInit.js';
export * from '../entity/viewRecord.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona' {
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
declare module 'vona' {
  export interface IModelRecord {
    'a-version:viewRecord': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-version' {
  export interface ModelViewRecord {
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
/** services: begin */
export * from '../service/database.js';
export * from '../service/version.js';
import { ServiceDatabase } from '../service/database.js';
import { ServiceVersion } from '../service/version.js';
export interface IModuleService {
  database: ServiceDatabase;
  version: ServiceVersion;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-version.service.database': ServiceDatabase;
    'a-version.service.version': ServiceVersion;
  }
}
declare module 'vona-module-a-version' {
  export interface ServiceDatabase {
    get scope(): ScopeModuleAVersion;
  }

  export interface ServiceVersion {
    get scope(): ScopeModuleAVersion;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
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
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAVersion extends BeanScopeBase {}

export interface ScopeModuleAVersion {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  entity: IModuleEntity;
  model: IModuleModel;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-version': ScopeModuleAVersion;
  }

  export interface IBeanScopeContainer {
    version: ScopeModuleAVersion;
  }

  export interface IBeanScopeConfig {
    'a-version': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-version': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-version:${K}` {
  return `a-version:${key}`;
}
/** scope: end */
