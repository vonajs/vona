/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-baseadmin.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-baseadmin' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/atomRight.js';
export * from '../service/auth.js';
export * from '../service/authScene.js';
export * from '../service/resourceRight.js';
export * from '../service/role.js';
export * from '../service/user.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-baseadmin:atomRight': never;
    'a-baseadmin:auth': never;
    'a-baseadmin:authScene': never;
    'a-baseadmin:resourceRight': never;
    'a-baseadmin:role': never;
    'a-baseadmin:user': never;
  }
}
declare module 'vona-module-a-baseadmin' {
  export interface ServiceAtomRight {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceAuthScene {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceResourceRight {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceRole {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceUser {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }
}
/** service: end */
/** service: begin */
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
/** service: end */
/** service: begin */
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
/** service: end */
/** controller: begin */
export * from '../controller/atomRight.js';
export * from '../controller/auth.js';
export * from '../controller/authScene.js';
export * from '../controller/resourceRight.js';
export * from '../controller/role.js';
export * from '../controller/user.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-baseadmin:atomRight': IDecoratorControllerOptions;
    'a-baseadmin:auth': IDecoratorControllerOptions;
    'a-baseadmin:authScene': IDecoratorControllerOptions;
    'a-baseadmin:resourceRight': IDecoratorControllerOptions;
    'a-baseadmin:role': IDecoratorControllerOptions;
    'a-baseadmin:user': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-baseadmin' {
  export interface ControllerAtomRight {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerAuth {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerAuthScene {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerResourceRight {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerRole {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerUser {
    /** @internal */
    get scope(): ScopeModuleABaseadmin;
  }
}
/** controller: end */
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
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleABaseadmin extends BeanScopeBase {}

export interface ScopeModuleABaseadmin {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-baseadmin:${K}` {
  return `a-baseadmin:${key}`;
}
/** scope: end */
