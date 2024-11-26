/** beans: begin */
export * from '../bean/bean.instance.js';
export * from '../bean/broadcast.reload.js';
export * from '../bean/broadcast.resetCache.js';
export * from '../bean/version.manager.js';
import { BeanInstance } from '../bean/bean.instance.js';
import { BroadcastReload } from '../bean/broadcast.reload.js';
import { BroadcastResetCache } from '../bean/broadcast.resetCache.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    instance: BeanInstance;
  }

  export interface IBeanRecordGeneral {
    'a-instance.broadcast.reload': BroadcastReload;
    'a-instance.broadcast.resetCache': BroadcastResetCache;
    'a-instance.version.manager': VersionManager;
  }
}
/** beans: end */
/** middlewares: begin */
export * from '../bean/middleware.appReady.js';
export * from '../bean/middleware.instance.js';

import 'vona';
declare module 'vona' {}
/** middlewares: end */
/** controllers: begin */
export * from '../controller/instance.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/instance.js';
/** entities: end */
/** models: begin */
export * from '../model/instance.js';
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
