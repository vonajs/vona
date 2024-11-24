/** beans: begin */
export * from '../bean/aop.regExp.js';
export * from '../bean/aop.simple.js';
export * from '../bean/bean.testCtx.js';
export * from '../bean/summer.cache.test.js';
import { AopRegExp } from '../bean/aop.regExp.js';
import { AopSimple } from '../bean/aop.simple.js';
import { BeanTestCtx } from '../bean/bean.testCtx.js';
import { SummerCacheTest } from '../bean/summer.cache.test.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    testCtx: BeanTestCtx;
  }

  export interface IBeanRecordGeneral {
    'vona-test.aop.regExp': AopRegExp;
    'vona-test.aop.simple': AopSimple;
    'vona-test.summer.cache.test': SummerCacheTest;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/bean.js';
export * from '../controller/performAction.js';
export * from '../controller/summer.js';
export * from '../controller/tail.js';
export * from '../controller/transaction.js';
/** controllers: end */
/** services: begin */
export * from '../service/test.js';
export * from '../service/testApp.js';
export * from '../service/testClass.js';
import { ServiceTest } from '../service/test.js';
import { ServiceTestApp } from '../service/testApp.js';
import { ServiceTestClass } from '../service/testClass.js';
export interface IModuleService {
  test: ServiceTest;
  testApp: ServiceTestApp;
  testClass: ServiceTestClass;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'vona-test.service.test': ServiceTest;
    'vona-test.service.testApp': ServiceTestApp;
    'vona-test.service.testClass': ServiceTestClass;
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleVonaTest extends BeanScopeBase {}

export interface ScopeModuleVonaTest
  extends TypeModuleResource<typeof config, never, (typeof locales)[TypeLocaleBase], never, IModuleService, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'vona-test': ScopeModuleVonaTest;
  }

  export interface IBeanScopeContainer {
    vonaTest: ScopeModuleVonaTest;
  }

  export interface IBeanScopeConfig {
    'vona-test': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'vona-test': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `vona-test:${K}` {
  return `vona-test:${key}`;
}
/** scope: end */
