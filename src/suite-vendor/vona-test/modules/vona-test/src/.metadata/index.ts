import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales } from 'vona';
/** aop: begin */
import type { IDecoratorAopOptions } from 'vona-module-a-aspect';
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';

import type { IDecoratorCacheMemOptions } from 'vona-module-a-cache';
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
import type { IDecoratorEventOptions } from 'vona-module-a-event';

import type { IDecoratorEventListenerOptions } from 'vona-module-a-event';
import type { IDecoratorQueueOptions } from 'vona-module-a-queue';

import type { IDecoratorScheduleOptions } from 'vona-module-a-schedule';
import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';

import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { IAopMethodOptionsTest } from '../bean/aopMethod.test.ts';

/** bean: end */
/** bean: begin */
import type { BeanTestCtx } from '../bean/bean.testCtx.ts';
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastTest } from '../bean/broadcast.test.ts';

/** cacheMem: end */
/** cacheMem: begin */
import type { CacheMemTest } from '../bean/cacheMem.test.ts';
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisTest } from '../bean/cacheRedis.test.ts';

/** event: end */
/** event: begin */
import type { EventHelloEcho } from '../bean/event.helloEcho.ts';
/** queue: end */
/** queue: begin */
import type { QueueTest } from '../bean/queue.test.ts';

/** summerCache: end */
/** summerCache: begin */
import type { SummerCacheTest } from '../bean/summerCache.test.ts';

import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */
import type { ServiceAopMethod } from '../service/aopMethod.ts';

import type { ServiceTest } from '../service/test.ts';

import type { ServiceTestApp } from '../service/testApp.ts';
import type { ServiceTestClass } from '../service/testClass.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
/** locale: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
/** service: end */
/** service: begin */

import locale_zh_cn from '../config/locale/zh-cn.ts';

import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/aop.regExp.ts';
export * from '../bean/aop.simple.ts';
declare module 'vona-module-a-aspect' {

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
/** aopMethod: begin */
export * from '../bean/aopMethod.test.ts';
declare module 'vona-module-a-aspect' {

  export interface IAopMethodRecord {
    'vona-test:test': IAopMethodOptionsTest;
  }

}
declare module 'vona-module-vona-test' {

  export interface AopMethodTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** aopMethod: end */
/** bean: begin */
export * from '../bean/bean.testCtx.ts';
declare module 'vona' {

}
declare module 'vona-module-vona-test' {

  export interface BeanTestCtx {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    testCtx: BeanTestCtx;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.test.ts';
declare module 'vona-module-a-broadcast' {

  export interface IBroadcastRecord {
    'vona-test:test': IDecoratorBroadcastOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface BroadcastTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
export interface IModuleBroadcast {
  test: BroadcastTest;
}
/** broadcast: end */
/** cacheMem: begin */
export * from '../bean/cacheMem.test.ts';
declare module 'vona-module-a-cache' {

  export interface ICacheMemRecord {
    'vona-test:test': IDecoratorCacheMemOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface CacheMemTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
export interface IModuleCacheMem {
  test: CacheMemTest;
}
/** cacheMem: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.test.ts';
declare module 'vona-module-a-cache' {

  export interface ICacheRedisRecord {
    'vona-test:test': IDecoratorCacheRedisOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface CacheRedisTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
export interface IModuleCacheRedis {
  test: CacheRedisTest;
}
/** cacheRedis: end */
/** event: begin */
export * from '../bean/event.helloEcho.ts';
declare module 'vona-module-a-event' {

  export interface IEventRecord {
    'vona-test:helloEcho': IDecoratorEventOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface EventHelloEcho {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
export interface IModuleEvent {
  helloEcho: EventHelloEcho;
}
/** event: end */
/** eventListener: begin */
export * from '../bean/eventListener.helloEcho.ts';
declare module 'vona-module-a-event' {

  export interface IEventListenerRecord {
    'vona-test:helloEcho': IDecoratorEventListenerOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface EventListenerHelloEcho {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** eventListener: end */
/** queue: begin */
export * from '../bean/queue.test.ts';
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
export interface IModuleQueue {
  test: QueueTest;
}
export * from '../bean/schedule.test3.ts';
/** queue: end */
/** schedule: begin */
export * from '../bean/schedule.test.ts';
declare module 'vona-module-a-schedule' {

  export interface IScheduleRecord {
    'vona-test:test': IDecoratorScheduleOptions;
    'vona-test:test3': IDecoratorScheduleOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface ScheduleTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ScheduleTest3 {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** schedule: end */
/** summerCache: begin */
export * from '../bean/summerCache.test.ts';
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
export interface IModuleSummerCache {
  test: SummerCacheTest;
}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
/** service: end */
/** controller: begin */
export * from '../controller/bean.ts';
declare module 'vona' {

  export interface IDtoRecord {
    'vona-test:profile': never;
    'vona-test:user': never;
  }

}
declare module 'vona-module-vona-test' {

}
export * from '../controller/cacheMem.ts';
export * from '../controller/cacheRedis.ts';
export * from '../controller/onion.ts';
export * from '../controller/passport.ts';
export * from '../controller/performAction.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'vona-test:aopMethod': never;
    'vona-test:test': never;
    'vona-test:testApp': never;
    'vona-test:testClass': never;
    'vona-test:transaction': never;
  }

}
declare module 'vona-module-vona-test' {

  export interface ServiceAopMethod {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

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

  export interface ServiceTransaction {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
export interface IModuleService {
  aopMethod: ServiceAopMethod;
  test: ServiceTest;
  testApp: ServiceTestApp;
  testClass: ServiceTestClass;
  transaction: ServiceTransaction;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'vona-test.service.aopMethod': ServiceAopMethod;
    'vona-test.service.test': ServiceTest;
    'vona-test.service.testApp': ServiceTestApp;
    'vona-test.service.testClass': ServiceTestClass;
    'vona-test.service.transaction': ServiceTransaction;
  }
}
export * from '../controller/queue.ts';
export * from '../controller/summer.ts';
export * from '../controller/tail.ts';
export * from '../controller/transaction.ts';
export * from '../controller/upload.ts';
/** summerCache: end */
/** dto: begin */
export * from '../dto/profile.ts';
export * from '../dto/user.ts';
/** dto: end */
/** service: begin */
export * from '../service/aopMethod.ts';
export * from '../service/test.ts';
export * from '../service/testApp.ts';
export * from '../service/testClass.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'vona-test:bean': IDecoratorControllerOptions;
    'vona-test:cacheMem': IDecoratorControllerOptions;
    'vona-test:cacheRedis': IDecoratorControllerOptions;
    'vona-test:onion': IDecoratorControllerOptions;
    'vona-test:passport': IDecoratorControllerOptions;
    'vona-test:performAction': IDecoratorControllerOptions;
    'vona-test:queue': IDecoratorControllerOptions;
    'vona-test:summer': IDecoratorControllerOptions;
    'vona-test:tail': IDecoratorControllerOptions;
    'vona-test:transaction': IDecoratorControllerOptions;
    'vona-test:upload': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-vona-test' {

  export interface ControllerBean {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerCacheMem {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerCacheRedis {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerOnion {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ControllerPassport {
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

  export interface ControllerUpload {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/vona/test/bean/test': '/vona/test/bean/test';
    '/vona/test/bean/service': '/vona/test/bean/service';
    '/': '/';
    '/vona/test/onion/echo3/:_string_': '/vona/test/onion/echo3:_userId_';
    '/vona/test/onion/echo3/:userId': `/vona/test/onion/echo3/${string}`;
    '/vona/test/onion/echo5': '/vona/test/onion/echo5';
    '/vona/test/onion/echo6': '/vona/test/onion/echo6';
    '/vona/test/passport/echo/:_string_': '/vona/test/passport/echo:_name_';
    '/vona/test/passport/echo/:name': `/vona/test/passport/echo/${string}`;
    '/vona/test/passport/isAuthenticated': '/vona/test/passport/isAuthenticated';
  }
  export interface IApiPathPostRecord {
    '/vona/test/cacheMem': '/vona/test/cacheMem';
    '/vona/test/cacheRedis': '/vona/test/cacheRedis';
    '//echo': '//echo';
    '/vona/test/onion/echo2/:_string_/:_string_': '/vona/test/onion/echo2:_userId_:_userName_';
    '/vona/test/onion/echo2/:userId/:userName': `/vona/test/onion/echo2/${string}/${string}`;
    '/vona/test/onion/echo4': '/vona/test/onion/echo4';
    '/vona/test/passport/login': '/vona/test/passport/login';
    '/vona/test/passport/refresh': '/vona/test/passport/refresh';
    '/vona/test/passport/logout': '/vona/test/passport/logout';
    '/vona/test/performAction/echo': '/vona/test/performAction/echo';
    '/vona/test/queue/pushAsync': '/vona/test/queue/pushAsync';
    '/vona/test/queue/push': '/vona/test/queue/push';
    '/vona/test/summer': '/vona/test/summer';
    '/vona/test/tail': '/vona/test/tail';
    '/vona/test/transaction/fail': '/vona/test/transaction/fail';
    '/vona/test/transaction/success': '/vona/test/transaction/success';
    '/vona/test/upload/fields': '/vona/test/upload/fields';
  }

}
export * from '../service/transaction.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleVonaTest extends BeanScopeBase {}

export interface ScopeModuleVonaTest {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  broadcast: IModuleBroadcast;
  cacheMem: IModuleCacheMem;
  cacheRedis: IModuleCacheRedis;
  event: IModuleEvent;
  queue: IModuleQueue;
  summerCache: IModuleSummerCache;
  service: IModuleService;
}
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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `vona-test::${K}` {
  return `vona-test::${key}`;
}
/** scope: end */
