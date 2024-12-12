/** beans: begin */
export * from '../bean/bean.validator.js';
import { BeanValidator } from '../bean/bean.validator.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    validator: BeanValidator;
  }

  export interface IBeanRecordGeneral {}
}
declare module 'vona-module-a-validator' {
  export interface BeanValidator {
    get scope(): ScopeModuleAValidator;
  }
}
/** beans: end */
/** pipe: begin */
export * from '../bean/pipe.valid.js';
import { IPipeOptionsValid } from '../bean/pipe.valid.js';
import 'vona';
declare module 'vona' {
  export interface IPipeRecordLocal {
    'a-validator:valid': IPipeOptionsValid;
  }
}
declare module 'vona-module-a-validator' {
  export interface PipeValid {
    get scope(): ScopeModuleAValidator;
  }
}
/** pipe: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleAValidator extends BeanScopeBase {}

export interface ScopeModuleAValidator {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  queue: IModulequeue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-validator': ScopeModuleAValidator;
  }

  export interface IBeanScopeContainer {
    validator: ScopeModuleAValidator;
  }

  export interface IBeanScopeLocale {
    'a-validator': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-validator:${K}` {
  return `a-validator:${key}`;
}
/** scope: end */
