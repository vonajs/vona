/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-progress.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-progress' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAProgress;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.progress.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-progress' {
  export interface BeanProgress {
    /** @internal */
    get scope(): ScopeModuleAProgress;
  }
}
/** bean: end */
/** bean: begin */
import { BeanProgress } from '../bean/bean.progress.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    progress: BeanProgress;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/progress.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-progress:progress': never;
  }
}
declare module 'vona-module-a-progress' {
  export interface ServiceProgress {
    /** @internal */
    get scope(): ScopeModuleAProgress;
  }
}
/** service: end */
/** service: begin */
import { ServiceProgress } from '../service/progress.js';
export interface IModuleService {
  progress: ServiceProgress;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-progress.service.progress': ServiceProgress;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/progress.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-progress:progress': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-progress' {
  export interface ControllerProgress {
    /** @internal */
    get scope(): ScopeModuleAProgress;
  }
}
/** controller: end */
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
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAProgress extends BeanScopeBase {}

export interface ScopeModuleAProgress {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
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
