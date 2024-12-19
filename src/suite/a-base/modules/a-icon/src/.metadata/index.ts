/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-icon.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-icon' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAIcon;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.icon.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-icon' {
  export interface BeanIcon {
    /** @internal */
    get scope(): ScopeModuleAIcon;
  }
}
/** bean: end */
/** bean: begin */
import { BeanIcon } from '../bean/bean.icon.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    icon: BeanIcon;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/icon.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-icon:icon': never;
  }
}
declare module 'vona-module-a-icon' {
  export interface ServiceIcon {
    /** @internal */
    get scope(): ScopeModuleAIcon;
  }
}
/** service: end */
/** service: begin */
import { ServiceIcon } from '../service/icon.js';
export interface IModuleService {
  icon: ServiceIcon;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-icon.service.icon': ServiceIcon;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/icon.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-icon:icon': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-icon' {
  export interface ControllerIcon {
    /** @internal */
    get scope(): ScopeModuleAIcon;
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleAIcon extends BeanScopeBase {}

export interface ScopeModuleAIcon {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-icon': ScopeModuleAIcon;
  }

  export interface IBeanScopeContainer {
    icon: ScopeModuleAIcon;
  }

  export interface IBeanScopeLocale {
    'a-icon': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-icon:${K}` {
  return `a-icon:${key}`;
}
/** scope: end */
