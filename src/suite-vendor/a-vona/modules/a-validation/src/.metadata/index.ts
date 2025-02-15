/** locale: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeLocaleBase, TypeModuleLocales } from 'vona';

/** bean: end */
/** bean: begin */
import type { BeanValidator } from '../bean/bean.validator.js';
/** pipe: end */
/** bean: begin */
import type { IPipeOptionsValid } from '../bean/pipe.valid.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.validator.js';
declare module 'vona-module-a-aspect' {
  export interface IPipeRecordLocal {
    'a-validation:valid': IPipeOptionsValid;
  }
}
declare module 'vona-module-a-validation' {
  export interface PipeValid {
    /** @internal */
    get scope(): ScopeModuleAValidation;
  }
}
/** pipe: begin */
export * from '../bean/pipe.valid.js';
declare module 'vona' {}
declare module 'vona-module-a-validation' {
  export interface BeanValidator {
    /** @internal */
    get scope(): ScopeModuleAValidation;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    validator: BeanValidator;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleAValidation extends BeanScopeBase {}

export interface ScopeModuleAValidation {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-validation': ScopeModuleAValidation;
  }

  export interface IBeanScopeContainer {
    validation: ScopeModuleAValidation;
  }

  export interface IBeanScopeLocale {
    'a-validation': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-validation::${K}` {
  return `a-validation::${key}`;
}
/** scope: end */
