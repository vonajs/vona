/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-app.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-app' {
  export interface VersionManager {
    get scope(): ScopeModuleAApp;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/app.js';
export * from '../entity/appContent.js';
export * from '../entity/appFull.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-app:app': IDecoratorEntityOptions;
    'a-app:appContent': IDecoratorEntityOptions;
    'a-app:appFull': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-app' {}
/** entity: end */
/** model: begin */
export * from '../model/app2.js';
export * from '../model/appContent.js';
export * from '../model/appFull.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-app:app2': IDecoratorModelOptions;
    'a-app:appContent': IDecoratorModelOptions;
    'a-app:appFull': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-app' {
  export interface ModelApp2 {
    get scope(): ScopeModuleAApp;
  }

  export interface ModelAppContent {
    get scope(): ScopeModuleAApp;
  }

  export interface ModelAppFull {
    get scope(): ScopeModuleAApp;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/resource.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-app:resource': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-app' {
  export interface ControllerResource {
    get scope(): ScopeModuleAApp;
  }
}
/** controller: end */
/** atom: begin */
export * from '../atom/app.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-app:app': never;
  }
}
declare module 'vona-module-a-app' {
  export interface AtomApp {
    get scope(): ScopeModuleAApp;
  }
}
/** atom: end */
/** entities: begin */
import { EntityApp } from '../entity/app.js';
import { EntityAppContent } from '../entity/appContent.js';
import { EntityAppFull } from '../entity/appFull.js';
export interface IModuleEntity {
  app: EntityApp;
  appContent: EntityAppContent;
  appFull: EntityAppFull;
}
declare module 'vona-module-a-app' {
  export interface EntityApp {
    column: <K extends keyof Omit<EntityApp, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityApp, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAppContent {
    column: <K extends keyof Omit<EntityAppContent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAppContent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAppFull {
    column: <K extends keyof Omit<EntityAppFull, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAppFull, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelApp2 } from '../model/app2.js';
import { ModelAppContent } from '../model/appContent.js';
import { ModelAppFull } from '../model/appFull.js';
export interface IModuleModel {
  app2: ModelApp2;
  appContent: ModelAppContent;
  appFull: ModelAppFull;
}
/** models: end */
/** services: begin */
export * from '../service/resource.js';
import { ServiceResource } from '../service/resource.js';
export interface IModuleService {
  resource: ServiceResource;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-app.service.resource': ServiceResource;
  }
}
declare module 'vona-module-a-app' {
  export interface ServiceResource {
    get scope(): ScopeModuleAApp;
  }
}
/** services: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleAApp extends BeanScopeBase {}

export interface ScopeModuleAApp {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-app': ScopeModuleAApp;
  }

  export interface IBeanScopeContainer {
    app: ScopeModuleAApp;
  }

  export interface IBeanScopeLocale {
    'a-app': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-app:${K}` {
  return `a-app:${key}`;
}
/** scope: end */
