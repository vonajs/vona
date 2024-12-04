/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-dashboardbooster.version.manager': VersionManager;
  }
}
/** beans: end */
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
export class ScopeModuleADashboardbooster extends BeanScopeBase {}

export interface ScopeModuleADashboardbooster
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-dashboardbooster': ScopeModuleADashboardbooster;
  }

  export interface IBeanScopeContainer {
    dashboardbooster: ScopeModuleADashboardbooster;
  }

  export interface IBeanScopeLocale {
    'a-dashboardbooster': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-dashboardbooster:${K}` {
  return `a-dashboardbooster:${key}`;
}
/** scope: end */
