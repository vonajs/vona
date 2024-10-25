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
/** atoms: begin */
export * from '../atom/app.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/resource.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/app.js';
export * from '../entity/appContent.js';
export * from '../entity/appFull.js';
/** entities: end */
/** models: begin */
export * from '../model/app2.js';
export * from '../model/appContent.js';
export * from '../model/appFull.js';
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
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-app': ScopeModuleAApp;
  }

  export interface BeanBase {
    $scopeApp: ScopeModuleAApp;
  }

  export interface IBeanScopeLocale {
    'a-app': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
