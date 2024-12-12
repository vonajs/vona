/** beans: begin */
export * from '../bean/bean.progress.js';
export * from '../bean/version.manager.js';
import { BeanProgress } from '../bean/bean.progress.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    progress: BeanProgress;
  }

  export interface IBeanRecordGeneral {
    'a-progress.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-progress' {
  export interface BeanProgress {
    get scope(): ScopeModuleAProgress;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAProgress;
  }
}
/** beans: end */
/** controller: begin */
export * from '../controller/progress.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-progress:progress': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-progress' {
  export interface ControllerProgress {
    get scope(): ScopeModuleAProgress;
  }
}
/** controller: end */
/** services: begin */
export * from '../service/progress.js';
import { ServiceProgress } from '../service/progress.js';
export interface IModuleService {
  progress: ServiceProgress;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-progress.service.progress': ServiceProgress;
  }
}
declare module 'vona-module-a-progress' {
  export interface ServiceProgress {
    get scope(): ScopeModuleAProgress;
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
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAProgress extends BeanScopeBase {}

export interface ScopeModuleAProgress {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  queue: IModuleQueue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-progress': ScopeModuleAProgress;
  }

  export interface IBeanScopeContainer {
    progress: ScopeModuleAProgress;
  }

  export interface IBeanScopeConfig {
    'a-progress': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-progress': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-progress:${K}` {
  return `a-progress:${key}`;
}
/** scope: end */
