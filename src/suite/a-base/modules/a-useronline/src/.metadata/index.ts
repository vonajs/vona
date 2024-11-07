/** beans: begin */
export * from '../bean/bean.userOnline.js';
export * from '../bean/version.manager.js';
import { BeanUserOnline } from '../bean/bean.userOnline.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    userOnline: BeanUserOnline;
  }

  export interface IBeanRecordGeneral {
    'a-useronline.version.manager': VersionManager;
  }
}
/** beans: end */
/** atoms: begin */
export * from '../atom/userOnline.js';
export * from '../atom/userOnlineHistory.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/userOnline.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/userOnline.js';
export * from '../entity/userOnlineHistory.js';
/** entities: end */
/** models: begin */
export * from '../model/userOnline.js';
export * from '../model/userOnlineHistory.js';
import { ModelUserOnline } from '../model/userOnline.js';
import { ModelUserOnlineHistory } from '../model/userOnlineHistory.js';
export interface IModuleModel {
  userOnline: ModelUserOnline;
  userOnlineHistory: ModelUserOnlineHistory;
}
/** models: end */
/** services: begin */
export * from '../service/userOnline.js';
import { ServiceUserOnline } from '../service/userOnline.js';
export interface IModuleService {
  userOnline: ServiceUserOnline;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-useronline.service.userOnline': ServiceUserOnline;
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
export class ScopeModuleAUseronline extends BeanScopeBase {}

export interface ScopeModuleAUseronline
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-useronline': ScopeModuleAUseronline;
  }

  export interface IBeanScopeContainer {
    useronline: ScopeModuleAUseronline;
  }

  export interface IBeanScopeConfig {
    'a-useronline': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-useronline': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
