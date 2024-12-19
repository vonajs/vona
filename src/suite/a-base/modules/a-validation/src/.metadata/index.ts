/** middleware: begin */
export * from '../bean/middleware.validate.js';

import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareRecordLocal {
    'a-validation:validate': never;
  }
}
declare module 'vona-module-a-validation' {
  export interface MiddlewareValidate {
    /** @internal */
    get scope(): ScopeModuleAValidation;
  }
}
/** middleware: end */
/** bean: begin */
export * from '../bean/bean.ajv.js';
export * from '../bean/bean.validation.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-validation' {
  export interface BeanAjv {
    /** @internal */
    get scope(): ScopeModuleAValidation;
  }

  export interface BeanValidation {
    /** @internal */
    get scope(): ScopeModuleAValidation;
  }
}
/** bean: end */
/** bean: begin */
import { BeanAjv } from '../bean/bean.ajv.js';
import { BeanValidation } from '../bean/bean.validation.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    ajv: BeanAjv;
    validation: BeanValidation;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/validation.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-validation:validation': never;
  }
}
declare module 'vona-module-a-validation' {
  export interface ServiceValidation {
    /** @internal */
    get scope(): ScopeModuleAValidation;
  }
}
/** service: end */
/** service: begin */
import { ServiceValidation } from '../service/validation.js';
export interface IModuleService {
  validation: ServiceValidation;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-validation.service.validation': ServiceValidation;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/validation.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-validation:validation': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-validation' {
  export interface ControllerValidation {
    /** @internal */
    get scope(): ScopeModuleAValidation;
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
export class ScopeModuleAValidation extends BeanScopeBase {}

export interface ScopeModuleAValidation {
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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-validation:${K}` {
  return `a-validation:${key}`;
}
/** scope: end */
