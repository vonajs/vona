/** beans: begin */
export * from '../bean/stats.user.js';
export * from '../bean/stats.userAlert.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
}
/** beans: end */
/** controllers: begin */
export * from '../controller/public.js';
export * from '../controller/user.js';
/** controllers: end */
/** services: begin */
export * from '../service/public.js';
export * from '../service/user.js';
import { ServicePublic } from '../service/public.js';
import { ServiceUser } from '../service/user.js';
export interface IModuleService {
  public: ServicePublic;
  user: ServiceUser;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-user.service.public': ServicePublic;
    'a-user.service.user': ServiceUser;
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
export class ScopeModuleAUser extends BeanScopeBase {}

export interface ScopeModuleAUser
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, IModuleService, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-user': ScopeModuleAUser;
  }

  export interface IBeanScopeContainer {
    user: ScopeModuleAUser;
  }

  export interface IBeanScopeLocale {
    'a-user': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
