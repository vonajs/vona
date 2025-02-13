/** aop: begin */
export * from '../bean/aop.regExp.js';
export * from '../bean/aop.simple.js';

import { type IDecoratorAopOptions } from 'vona-module-a-aspect';
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
/** bean: begin */
export * from '../bean/bean.testCtx.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-vona-test' {
  export interface BeanTestCtx {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** bean: end */
/** bean: begin */
import { BeanTestCtx } from '../bean/bean.testCtx.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    testCtx: BeanTestCtx;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.test.js';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
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
/** broadcast: end */
/** broadcast: begin */
import { BroadcastTest } from '../bean/broadcast.test.js';
export interface IModuleBroadcast {
  test: BroadcastTest;
}
/** broadcast: end */
/** cacheMem: begin */
export * from '../bean/cacheMem.test.js';

import { type IDecoratorCacheMemOptions } from 'vona-module-a-cache';
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
/** cacheMem: end */
/** cacheMem: begin */
import { CacheMemTest } from '../bean/cacheMem.test.js';
export interface IModuleCacheMem {
  test: CacheMemTest;
}
/** cacheMem: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.test.js';

import { type IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
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
/** cacheRedis: end */
/** cacheRedis: begin */
import { CacheRedisTest } from '../bean/cacheRedis.test.js';
export interface IModuleCacheRedis {
  test: CacheRedisTest;
}
/** cacheRedis: end */
/** event: begin */
export * from '../bean/event.helloEcho.js';

import { type IDecoratorEventOptions } from 'vona-module-a-event';
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
/** event: end */
/** event: begin */
import { EventHelloEcho } from '../bean/event.helloEcho.js';
export interface IModuleEvent {
  helloEcho: EventHelloEcho;
}
/** event: end */
/** eventListener: begin */
export * from '../bean/eventListener.helloEcho.js';

import { type IDecoratorEventListenerOptions } from 'vona-module-a-event';
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
export * from '../bean/queue.test.js';

import { type IDecoratorQueueOptions } from 'vona-module-a-queue';
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
export * from '../bean/schedule.test2.js';

import { type IDecoratorScheduleOptions } from 'vona-module-a-schedule';
declare module 'vona-module-a-schedule' {
  export interface IScheduleRecord {
    'vona-test:test': IDecoratorScheduleOptions;
    'vona-test:test2': IDecoratorScheduleOptions;
  }
}
declare module 'vona-module-vona-test' {
  export interface ScheduleTest {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }

  export interface ScheduleTest2 {
    /** @internal */
    get scope(): ScopeModuleVonaTest;
  }
}
/** schedule: end */
/** summerCache: begin */
export * from '../bean/summerCache.test.js';

import { type IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
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
declare module 'vona-module-a-web' {
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
export * from '../controller/cacheMem.js';
export * from '../controller/cacheRedis.js';
export * from '../controller/onion.js';
export * from '../controller/passport.js';
export * from '../controller/performAction.js';
export * from '../controller/queue.js';
export * from '../controller/summer.js';
export * from '../controller/tail.js';
export * from '../controller/transaction.js';

import { type IDecoratorControllerOptions } from 'vona-module-a-web';
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
    '/vona/test/passport/echo/:_string_': '/vona/test/passport/echo:_name_';
    '/vona/test/passport/echo/:name': `/vona/test/passport/echo/${string}`;
  }
  export interface IApiPathPostRecord {
    '/vona/test/cacheMem': '/vona/test/cacheMem';
    '/vona/test/cacheRedis': '/vona/test/cacheRedis';
    '//echo': '//echo';
    '/vona/test/onion/echo2/:_string_/:_string_': '/vona/test/onion/echo2:_userId_:_userName_';
    '/vona/test/onion/echo2/:userId/:userName': `/vona/test/onion/echo2/${string}/${string}`;
    '/vona/test/onion/echo4': '/vona/test/onion/echo4';
    '/vona/test/performAction/echo': '/vona/test/performAction/echo';
    '/vona/test/queue/pushAsync': '/vona/test/queue/pushAsync';
    '/vona/test/queue/push': '/vona/test/queue/push';
    '/vona/test/summer': '/vona/test/summer';
    '/vona/test/tail': '/vona/test/tail';
    '/vona/test/transaction/fail': '/vona/test/transaction/fail';
    '/vona/test/transaction/success': '/vona/test/transaction/success';
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
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `vona-test::${K}` {
  return `vona-test::${key}`;
}
/** scope: end */
