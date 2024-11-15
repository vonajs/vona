/** beans: begin */
export * from '../bean/bean.ajv.js';
export * from '../bean/bean.validation.js';
import { BeanAjv } from '../bean/bean.ajv.js';
import { BeanValidation } from '../bean/bean.validation.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    ajv: BeanAjv;
    validation: BeanValidation;
  }
}
/** beans: end */
/** middlewares: begin */
export * from '../bean/middleware.validate.js';

import 'vona';
declare module 'vona' {}
/** middlewares: end */
/** controllers: begin */
export * from '../controller/validation.js';
/** controllers: end */
/** services: begin */
export * from '../service/validation.js';
import { ServiceValidation } from '../service/validation.js';
export interface IModuleService {
  validation: ServiceValidation;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-validation.service.validation': ServiceValidation;
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
export class ScopeModuleAValidation extends BeanScopeBase {}

export interface ScopeModuleAValidation
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    never
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-validation': ScopeModuleAValidation;
  }

  export interface IBeanScopeContainer {
    validation: ScopeModuleAValidation;
  }

  export interface IBeanScopeConfig {
    'a-validation': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-validation': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
