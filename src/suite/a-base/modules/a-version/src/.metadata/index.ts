/** beans: begin */
export * from '../bean/bean.worker.js';
export * from '../bean/broadcast.columnsClear.js';
export * from '../bean/startup.databaseInit.js';
export * from '../bean/startup.databaseName.js';
export * from '../bean/startup.instanceInit.js';
export * from '../bean/startup.workerAlive.js';
export * from '../bean/version.manager.js';
import { BeanWorker } from '../bean/bean.worker.js';
import { BroadcastColumnsClear } from '../bean/broadcast.columnsClear.js';
import { StartupDatabaseInit } from '../bean/startup.databaseInit.js';
import { StartupDatabaseName } from '../bean/startup.databaseName.js';
import { StartupInstanceInit } from '../bean/startup.instanceInit.js';
import { StartupWorkerAlive } from '../bean/startup.workerAlive.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    worker: BeanWorker;
  }

  export interface IBeanRecordGeneral {
    'a-version.broadcast.columnsClear': BroadcastColumnsClear;
    'a-version.startup.databaseInit': StartupDatabaseInit;
    'a-version.startup.databaseName': StartupDatabaseName;
    'a-version.startup.instanceInit': StartupInstanceInit;
    'a-version.startup.workerAlive': StartupWorkerAlive;
    'a-version.version.manager': VersionManager;
  }
}
/** beans: end */
/** entities: begin */
export * from '../entity/version.js';
export * from '../entity/versionInit.js';
export * from '../entity/viewRecord.js';
/** entities: end */
/** models: begin */
export * from '../model/viewRecord.js';
import { ModelViewRecord } from '../model/viewRecord.js';
export interface IModuleModel {
  viewRecord: ModelViewRecord;
}
/** models: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAVersion extends BeanScopeBase {}

export interface ScopeModuleAVersion
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    IModuleModel
  > {}

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
/** scope: end */
