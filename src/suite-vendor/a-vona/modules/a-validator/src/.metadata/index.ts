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
/** beans: end */
/** pipe: begin */
export * from '../bean/pipe.defaultValue.js';
export * from '../bean/pipe.valid.js';
export * from '../bean/pipe.validation.js';
import { IPipeOptionsDefaultValue } from '../bean/pipe.defaultValue.js';
import { IPipeOptionsValid } from '../bean/pipe.valid.js';
import { IPipeOptionsValidation } from '../bean/pipe.validation.js';
import 'vona';
declare module 'vona' {
  export interface IPipeRecordGlobal {
    'a-validator:validation': IPipeOptionsValidation;
  }

  export interface IPipeRecordLocal {
    'a-validator:defaultValue': IPipeOptionsDefaultValue;
    'a-validator:valid': IPipeOptionsValid;
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAValidator extends BeanScopeBase {}

export interface ScopeModuleAValidator
  extends TypeModuleResource<
    never,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    never,
    never,
    never,
    never,
    never
  > {}

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
