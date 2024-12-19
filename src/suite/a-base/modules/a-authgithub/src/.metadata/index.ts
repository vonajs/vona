/** beans: begin */
export * from '../bean/auth.provider.github.js';
export * from '../bean/version.manager.js';
import { AuthProviderGithub } from '../bean/auth.provider.github.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-authgithub.auth.provider.github': AuthProviderGithub;
    'a-authgithub.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-authgithub' {
  export interface AuthProviderGithub {
    /** @internal */
    get scope(): ScopeModuleAAuthgithub;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAAuthgithub;
  }
}
/** beans: end */
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
/** scope: begin */
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAuthgithub extends BeanScopeBase {}

export interface ScopeModuleAAuthgithub {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authgithub': ScopeModuleAAuthgithub;
  }

  export interface IBeanScopeContainer {
    authgithub: ScopeModuleAAuthgithub;
  }

  export interface IBeanScopeConfig {
    'a-authgithub': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-authgithub': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-authgithub:${K}` {
  return `a-authgithub:${key}`;
}
/** scope: end */
