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
/** model: end */
/** controller: begin */
export * from '../controller/resource.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-app:resource': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** atoms: begin */
export * from '../atom/app.js';
/** atoms: end */
/** entities: begin */
import { EntityApp } from '../entity/app.js';
import { EntityAppContent } from '../entity/appContent.js';
import { EntityAppFull } from '../entity/appFull.js';
export interface IModuleEntity {
  app: EntityApp;
  appContent: EntityAppContent;
  appFull: EntityAppFull;
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAApp extends BeanScopeBase {}

export interface ScopeModuleAApp
  extends TypeModuleResource<
    never,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    never,
    IModuleService,
    IModuleModel,
    IModuleEntity,
    never
  > {}

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
