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
    get scope(): ScopeModuleABaseadmin;
  }
}
/** beans: end */
/** controller: begin */
export * from '../controller/atomRight.js';
export * from '../controller/auth.js';
export * from '../controller/authScene.js';
export * from '../controller/resourceRight.js';
export * from '../controller/role.js';
export * from '../controller/user.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
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
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerAuth {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerAuthScene {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerResourceRight {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerRole {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ControllerUser {
    get scope(): ScopeModuleABaseadmin;
  }
}
/** controller: end */
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
declare module 'vona-module-a-baseadmin' {
  export interface ServiceAtomRight {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceAuth {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceAuthScene {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceResourceRight {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceRole {
    get scope(): ScopeModuleABaseadmin;
  }

  export interface ServiceUser {
    get scope(): ScopeModuleABaseadmin;
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
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleABaseadmin extends BeanScopeBase {}

export interface ScopeModuleABaseadmin {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  atom: IModuleatom;
  middleware: IModulemiddleware;
  guard: IModuleguard;
  interceptor: IModuleinterceptor;
  pipe: IModulepipe;
  filter: IModulefilter;
  socketConnection: IModulesocketConnection;
  socketPacket: IModulesocketPacket;
  aop: IModuleaop;
  entity: IModuleentity;
  model: IModulemodel;
  controller: IModulecontroller;
  meta: IModulemeta;
  summerCache: IModulesummerCache;
  startup: IModulestartup;
  queue: IModulequeue;
  schedule: IModuleschedule;
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
