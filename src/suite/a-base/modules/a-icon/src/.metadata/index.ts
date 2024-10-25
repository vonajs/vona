/** beans: begin */
export * from '../bean/bean.icon.js';
export * from '../bean/version.manager.js';
import { BeanIcon } from '../bean/bean.icon.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    icon: BeanIcon;
  }

  export interface IBeanRecordGeneral {
    'a-icon.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/icon.js';
/** controllers: end */
/** services: begin */
export * from '../service/icon.js';
import { ServiceIcon } from '../service/icon.js';
export interface IModuleService {
  icon: ServiceIcon;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-icon.service.icon': ServiceIcon;
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
export class ScopeModuleAIcon extends BeanScopeBase {}

export interface ScopeModuleAIcon
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-icon': ScopeModuleAIcon;
  }

  export interface IBeanScopeLocale {
    'a-icon': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
