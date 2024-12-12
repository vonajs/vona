/** beans: begin */
export * from '../bean/stats.user.js';
export * from '../bean/stats.userAlert.js';
import { StatsUser } from '../bean/stats.user.js';
import { StatsUserAlert } from '../bean/stats.userAlert.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-user.stats.user': StatsUser;
    'a-user.stats.userAlert': StatsUserAlert;
  }
}
declare module 'vona-module-a-user' {
  export interface StatsUser {
    get scope(): ScopeModuleAUser;
  }

  export interface StatsUserAlert {
    get scope(): ScopeModuleAUser;
  }
}
/** beans: end */
/** controller: begin */
export * from '../controller/public.js';
export * from '../controller/user.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-user:public': IDecoratorControllerOptions;
    'a-user:user': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-user' {
  export interface ControllerPublic {
    get scope(): ScopeModuleAUser;
  }

  export interface ControllerUser {
    get scope(): ScopeModuleAUser;
  }
}
/** controller: end */
/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-user:status': never;
  }
}
declare module 'vona-module-a-user' {
  export interface MetaStatus {
    get scope(): ScopeModuleAUser;
  }
}
/** meta: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
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
declare module 'vona-module-a-user' {
  export interface ServicePublic {
    get scope(): ScopeModuleAUser;
  }

  export interface ServiceUser {
    get scope(): ScopeModuleAUser;
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
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleAUser extends BeanScopeBase {}

export interface ScopeModuleAUser {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  status: MetaStatus;
  service: IModuleService;
  queue: IModuleQueue;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-user:${K}` {
  return `a-user:${key}`;
}
/** scope: end */
