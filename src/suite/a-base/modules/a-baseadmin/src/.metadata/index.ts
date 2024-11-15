/** beans: begin */
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
}
/** beans: end */
/** controllers: begin */
export * from '../controller/atomRight.js';
export * from '../controller/auth.js';
export * from '../controller/authScene.js';
export * from '../controller/resourceRight.js';
export * from '../controller/role.js';
export * from '../controller/user.js';
/** controllers: end */
/** services: begin */
export * from '../service/atomRight.js';
export * from '../service/auth.js';
export * from '../service/authScene.js';
export * from '../service/resourceRight.js';
export * from '../service/role.js';
export * from '../service/user.js';
import { ServiceAtomRight } from '../service/atomRight.js';
import { ServiceAuth } from '../service/auth.js';
import { ServiceAuthScene } from '../service/authScene.js';
import { ServiceResourceRight } from '../service/resourceRight.js';
import { ServiceRole } from '../service/role.js';
import { ServiceUser } from '../service/user.js';
export interface IModuleService {
  atomRight: ServiceAtomRight;
  auth: ServiceAuth;
  authScene: ServiceAuthScene;
  resourceRight: ServiceResourceRight;
  role: ServiceRole;
  user: ServiceUser;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-baseadmin.service.atomRight': ServiceAtomRight;
    'a-baseadmin.service.auth': ServiceAuth;
    'a-baseadmin.service.authScene': ServiceAuthScene;
    'a-baseadmin.service.resourceRight': ServiceResourceRight;
    'a-baseadmin.service.role': ServiceRole;
    'a-baseadmin.service.user': ServiceUser;
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
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleABaseadmin extends BeanScopeBase {}

export interface ScopeModuleABaseadmin
  extends TypeModuleResource<never, typeof Errors, (typeof locales)[TypeLocaleBase], never, IModuleService, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-baseadmin': ScopeModuleABaseadmin;
  }

  export interface IBeanScopeContainer {
    baseadmin: ScopeModuleABaseadmin;
  }

  export interface IBeanScopeLocale {
    'a-baseadmin': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
