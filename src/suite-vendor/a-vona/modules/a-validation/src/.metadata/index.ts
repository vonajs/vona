/* eslint-disable */
/** pipe: begin */
export * from '../bean/pipe.valid.ts';
import type { IPipeOptionsValid } from '../bean/pipe.valid.ts';
import 'vona';
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

          export interface PipeValid {
            get $beanFullName(): 'a-validation.pipe.valid';
            get $onionName(): 'a-validation:valid';
          } 
}
/** pipe: end */
/** bean: begin */
export * from '../bean/bean.validator.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-validation' {
  
        export interface BeanValidator {
          /** @internal */
          get scope(): ScopeModuleAValidation;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanValidator } from '../bean/bean.validator.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'validator': BeanValidator;
  }
}
/** bean: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAValidation extends BeanScopeBase {}

export interface ScopeModuleAValidation {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-validation::${K}` {
  return `a-validation::${key}`;
}
/** scope: end */
