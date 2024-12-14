/** beans: begin */
export * from '../bean/bean.testCtx.js';
import { BeanTestCtx } from '../bean/bean.testCtx.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    testCtx: BeanTestCtx;
  }

  export interface IBeanRecordGeneral {}
}
declare module 'vona-module-vona-test' {
  export interface BeanTestCtx {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** beans: end */
/** aop: begin */
export * from '../bean/aop.regExp.js';
export * from '../bean/aop.simple.js';

import { IDecoratorAopOptions } from 'vona';
declare module 'vona' {
  export interface IAopRecord {
    'vona-test:regExp': IDecoratorAopOptions;
    'vona-test:simple': IDecoratorAopOptions;
  }
}
declare module 'vona-module-vona-test' {
  export interface AopRegExp {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface AopSimple {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** aop: end */
/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'vona-test:status': never;
  }
}
declare module 'vona-module-vona-test' {
  export interface MetaStatus {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** meta: end */
/** summerCache: begin */
export * from '../bean/summerCache.test.js';

import { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
declare module 'vona-module-a-summer' {
  export interface ISummerCacheRecord {
    'vona-test:test': IDecoratorSummerCacheOptions;
  }
}
declare module 'vona-module-vona-test' {
  export interface SummerCacheTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** summerCache: end */
/** summerCache: begin */
import { SummerCacheTest } from '../bean/summerCache.test.js';
export interface IModuleSummerCache {
  test: SummerCacheTest;
}
/** summerCache: end */
/** queue: begin */
export * from '../bean/queue.test.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'vona-test:test': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-vona-test' {
  export interface QueueTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** queue: end */
/** queue: begin */
import { QueueTest } from '../bean/queue.test.js';
export interface IModuleQueue {
  test: QueueTest;
}
/** queue: end */
/** schedule: begin */
export * from '../bean/schedule.test.js';

import { IDecoratorScheduleOptions } from 'vona-module-a-schedule';
declare module 'vona-module-a-schedule' {
  export interface IScheduleRecord {
    'vona-test:test': IDecoratorScheduleOptions;
  }
}
declare module 'vona-module-vona-test' {
  export interface ScheduleTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** schedule: end */
/** dto: begin */
export * from '../dto/profile.js';
export * from '../dto/user.js';

import 'vona';
declare module 'vona' {
  export interface IDtoRecord {
    'vona-test:profile': never;
    'vona-test:user': never;
  }
}
declare module 'vona-module-vona-test' {}
/** dto: end */
/** service: begin */
export * from '../service/test.js';
export * from '../service/testApp.js';
export * from '../service/testClass.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'vona-test:test': never;
    'vona-test:testApp': never;
    'vona-test:testClass': never;
  }
}
declare module 'vona-module-vona-test' {
  export interface ServiceTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ServiceTestApp {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ServiceTestClass {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** service: end */
/** service: begin */
import { ServiceTest } from '../service/test.js';
import { ServiceTestApp } from '../service/testApp.js';
import { ServiceTestClass } from '../service/testClass.js';
export interface IModuleService {
  test: ServiceTest;
  testApp: ServiceTestApp;
  testClass: ServiceTestClass;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'vona-test.service.test': ServiceTest;
    'vona-test.service.testApp': ServiceTestApp;
    'vona-test.service.testClass': ServiceTestClass;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/bean.js';
export * from '../controller/onion.js';
export * from '../controller/performAction.js';
export * from '../controller/queue.js';
export * from '../controller/status.js';
export * from '../controller/summer.js';
export * from '../controller/tail.js';
export * from '../controller/transaction.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'vona-test:bean': IDecoratorControllerOptions;
    'vona-test:onion': IDecoratorControllerOptions;
    'vona-test:performAction': IDecoratorControllerOptions;
    'vona-test:queue': IDecoratorControllerOptions;
    'vona-test:status': IDecoratorControllerOptions;
    'vona-test:summer': IDecoratorControllerOptions;
    'vona-test:tail': IDecoratorControllerOptions;
    'vona-test:transaction': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-vona-test' {
  export interface ControllerBean {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerOnion {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerPerformAction {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerQueue {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerStatus {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerSummer {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerTail {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerTransaction {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** controller: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
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
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleVonaTest extends BeanScopeBase {}

export interface ScopeModuleVonaTest {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  status: MetaStatus;
  summerCache: IModuleSummerCache;
  queue: IModuleQueue;
  service: IModuleService;
}

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
