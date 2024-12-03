/** beans: begin */
export * from '../bean/bean.instance.js';
export * from '../bean/broadcast.reload.js';
export * from '../bean/broadcast.resetCache.js';
export * from '../bean/meta.version.js';
export * from '../bean/meta.version1.js';
export * from '../bean/version.manager.js';
import { BeanInstance } from '../bean/bean.instance.js';
import { BroadcastReload } from '../bean/broadcast.reload.js';
import { BroadcastResetCache } from '../bean/broadcast.resetCache.js';
import { MetaVersion } from '../bean/meta.version.js';
import { MetaVersion1 } from '../bean/meta.version1.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    instance: BeanInstance;
  }

  export interface IBeanRecordGeneral {
    'a-instance.broadcast.reload': BroadcastReload;
    'a-instance.broadcast.resetCache': BroadcastResetCache;
    'a-instance.meta.version': MetaVersion;
    'a-instance.meta.version1': MetaVersion1;
    'a-instance.version.manager': VersionManager;
  }
}
/** beans: end */
/** middleware: begin */
export * from '../bean/middleware.appReady.js';
export * from '../bean/middleware.instance.js';

import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecordLocal {
    'a-instance:appReady': never;
    'a-instance:instance': never;
  }
}
/** middleware: end */
/** entity: begin */
export * from '../entity/instance.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-instance:instance': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/instance.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-instance:instance': IDecoratorModelOptions;
  }
}
/** model: end */
/** controllers: begin */
export * from '../controller/instance.js';
/** controllers: end */
/** models: begin */
import { ModelInstance } from '../model/instance.js';
export interface IModuleModel {
  instance: ModelInstance;
}
/** models: end */
/** services: begin */
export * from '../service/instance.js';
import { ServiceInstance } from '../service/instance.js';
export interface IModuleService {
  instance: ServiceInstance;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-instance.service.instance': ServiceInstance;
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAInstance extends BeanScopeBase {}

export interface ScopeModuleAInstance
  extends TypeModuleResource<
    typeof config,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    IModuleModel
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-instance': ScopeModuleAInstance;
  }

  export interface IBeanScopeContainer {
    instance: ScopeModuleAInstance;
  }

  export interface IBeanScopeConfig {
    'a-instance': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-instance': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-instance:${K}` {
  return `a-instance:${key}`;
}
/** scope: end */
