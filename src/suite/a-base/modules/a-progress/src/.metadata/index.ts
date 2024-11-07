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
/** beans: end */
/** controllers: begin */
export * from '../controller/progress.js';
/** controllers: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAProgress extends BeanScopeBase {}

export interface ScopeModuleAProgress
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    any,
    IModuleService,
    any
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-progress': ScopeModuleAProgress;
  }

  export interface BeanScopeContainer {
    progress: ScopeModuleAProgress;
  }

  export interface IBeanScopeConfig {
    'a-progress': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-progress': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
