import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales } from 'vona';
/** aop: begin */
import type { IDecoratorAopOptions } from 'vona-module-a-aspect';
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';

import type { IDecoratorCacheMemOptions } from 'vona-module-a-cache';
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';

import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import type { IDecoratorModelOptions } from 'vona-module-a-database';

import type { EventOn } from 'vona-module-a-event';
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
/** event: end */
/** event: begin */
import type { TypeEventHelloEchoData, TypeEventHelloEchoResult } from '../bean/event.helloEcho.ts';
/** queue: end */
/** queue: begin */
import type { QueueTest } from '../bean/queue.test.ts';

/** summerCache: end */
/** summerCache: begin */
import type { SummerCacheTest } from '../bean/summerCache.test.ts';

import type { config } from '../config/config.ts';

/** entity: end */
/** entity: begin */
import type { EntityTest } from '../entity/test.ts';
/** model: end */
/** model: begin */
import type { ModelTest } from '../model/test.ts';

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
import locale_zh_cn from '../config/locale/zh-cn.ts';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';

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
    'test-vona:regExp': IDecoratorAopOptions;
    'test-vona:simple': IDecoratorAopOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface AopRegExp {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface AopSimple {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
/** aop: end */
/** aopMethod: begin */
export * from '../bean/aopMethod.test.ts';
declare module 'vona-module-a-aspect' {

  export interface IAopMethodRecord {
    'test-vona:test': IAopMethodOptionsTest;
  }

}
declare module 'vona-module-test-vona' {

  export interface AopMethodTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.testCtx.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'test-vona:test': IDecoratorEntityOptions;
  }

}
declare module 'vona-module-test-vona' {

}
export interface IModuleEntity {
  test: EntityTest;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-test-vona' {

  export interface EntityTest {
    $column: <K extends keyof Omit<EntityTest, 'column' | 'columns' | 'table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityTest, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.test.ts';
declare module 'vona-module-a-database' {

  export interface IModelRecord {
    'test-vona:test': IDecoratorModelOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface ModelTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleModel {
  test: ModelTest;
}
/** broadcast: end */
/** cacheMem: begin */
export * from '../bean/cacheMem.test.ts';
declare module 'vona' {

}
declare module 'vona-module-test-vona' {

  export interface BeanTestCtx {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    testCtx: BeanTestCtx;
  }
}
/** cacheMem: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.test.ts';
declare module 'vona-module-a-broadcast' {

  export interface IBroadcastRecord {
    'test-vona:test': IDecoratorBroadcastOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface BroadcastTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleBroadcast {
  test: BroadcastTest;
}
/** cacheRedis: end */
/** event: begin */
export * from '../bean/event.helloEcho.ts';
declare module 'vona-module-a-cache' {

  export interface ICacheMemRecord {
    'test-vona:test': IDecoratorCacheMemOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface CacheMemTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleCacheMem {
  test: CacheMemTest;
}
/** event: end */
/** eventListener: begin */
export * from '../bean/eventListener.helloEcho.ts';
declare module 'vona-module-a-cache' {

  export interface ICacheRedisRecord {
    'test-vona:test': IDecoratorCacheRedisOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface CacheRedisTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleCacheRedis {
  test: CacheRedisTest;
}
/** eventListener: end */
/** meta: begin */
export * from '../bean/meta.version.ts';
declare module 'vona' {

}
declare module 'vona-module-test-vona' {

  export interface EventHelloEcho {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleEvent {
  helloEcho: EventHelloEcho;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'test-vona:helloEcho': EventOn<TypeEventHelloEchoData, TypeEventHelloEchoResult>;
  }
}
/** meta: end */
/** queue: begin */
export * from '../bean/queue.test.ts';
declare module 'vona-module-a-event' {

  export interface IEventListenerRecord {
    'test-vona:helloEcho': IDecoratorEventListenerOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface EventListenerHelloEcho {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export * from '../bean/schedule.test3.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'test-vona:version': never;
  }

}
declare module 'vona-module-test-vona' {

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
/** queue: end */
/** schedule: begin */
export * from '../bean/schedule.test.ts';
declare module 'vona-module-a-queue' {

  export interface IQueueRecord {
    'test-vona:test': IDecoratorQueueOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface QueueTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleQueue {
  test: QueueTest;
}
/** schedule: end */
/** summerCache: begin */
export * from '../bean/summerCache.test.ts';
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-schedule' {

  export interface IScheduleRecord {
    'test-vona:test': IDecoratorScheduleOptions;
    'test-vona:test3': IDecoratorScheduleOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface ScheduleTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ScheduleTest3 {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/bean.ts';
declare module 'vona-module-a-summer' {

  export interface ISummerCacheRecord {
    'test-vona:test': IDecoratorSummerCacheOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface SummerCacheTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
export interface IModuleSummerCache {
  test: SummerCacheTest;
}
export * from '../controller/cacheMem.ts';
export * from '../controller/cacheRedis.ts';
declare module 'vona' {

  export interface IDtoRecord {
    'test-vona:profile': never;
    'test-vona:user': never;
  }

}
declare module 'vona-module-test-vona' {

}
export * from '../controller/onion.ts';
export * from '../controller/passport.ts';
export * from '../controller/performAction.ts';
export * from '../controller/queue.ts';
export * from '../controller/summer.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'test-vona:aopMethod': never;
    'test-vona:test': never;
    'test-vona:testApp': never;
    'test-vona:testClass': never;
    'test-vona:transaction': never;
  }

}
declare module 'vona-module-test-vona' {

  export interface ServiceAopMethod {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ServiceTest {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ServiceTestApp {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ServiceTestClass {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ServiceTransaction {
    /** @internal */
    get scope(): ScopeModuleTestVona;
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
    'test-vona.service.aopMethod': ServiceAopMethod;
    'test-vona.service.test': ServiceTest;
    'test-vona.service.testApp': ServiceTestApp;
    'test-vona.service.testClass': ServiceTestClass;
    'test-vona.service.transaction': ServiceTransaction;
  }
}
export * from '../controller/tail.ts';
export * from '../controller/transaction.ts';
export * from '../controller/upload.ts';
/** summerCache: end */
/** dto: begin */
export * from '../dto/profile.ts';
export * from '../dto/user.ts';
/** aopMethod: end */
/** entity: begin */
export * from '../entity/test.ts';
/** entity: end */
/** model: begin */
export * from '../model/test.ts';
/** dto: end */
/** service: begin */
export * from '../service/aopMethod.ts';
export * from '../service/test.ts';
export * from '../service/testApp.ts';
export * from '../service/testClass.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'test-vona:bean': IDecoratorControllerOptions;
    'test-vona:cacheMem': IDecoratorControllerOptions;
    'test-vona:cacheRedis': IDecoratorControllerOptions;
    'test-vona:onion': IDecoratorControllerOptions;
    'test-vona:passport': IDecoratorControllerOptions;
    'test-vona:performAction': IDecoratorControllerOptions;
    'test-vona:queue': IDecoratorControllerOptions;
    'test-vona:summer': IDecoratorControllerOptions;
    'test-vona:tail': IDecoratorControllerOptions;
    'test-vona:transaction': IDecoratorControllerOptions;
    'test-vona:upload': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-test-vona' {

  export interface ControllerBean {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerCacheMem {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerCacheRedis {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerOnion {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerPassport {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerPerformAction {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerQueue {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerSummer {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerTail {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerTransaction {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }

  export interface ControllerUpload {
    /** @internal */
    get scope(): ScopeModuleTestVona;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/test/vona/bean/test': undefined;
    '/test/vona/bean/service': undefined;
    '/': undefined;
    '/test/vona/onion/echo3/:userId': undefined;
    '/test/vona/onion/echo5': undefined;
    '/test/vona/onion/echo6': undefined;
    '/test/vona/passport/echo/:name': undefined;
    '/test/vona/passport/isAuthenticated': undefined;
  }
  export interface IApiPathPostRecord {
    '/test/vona/cacheMem': undefined;
    '/test/vona/cacheRedis': undefined;
    '//echo': undefined;
    '/test/vona/onion/echo2/:userId/:userName': undefined;
    '/test/vona/onion/echo4': undefined;
    '/test/vona/passport/login': undefined;
    '/test/vona/passport/refresh': undefined;
    '/test/vona/passport/logout': undefined;
    '/test/vona/performAction/echo': undefined;
    '/test/vona/queue/pushAsync': undefined;
    '/test/vona/queue/push': undefined;
    '/test/vona/summer': undefined;
    '/test/vona/tail': undefined;
    '/test/vona/transaction/fail': undefined;
    '/test/vona/transaction/success': undefined;
    '/test/vona/upload/fields': undefined;
    '/test/vona/upload/file': undefined;
    '/test/vona/upload/files': undefined;
  }

}
export * from '../service/transaction.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleTestVona extends BeanScopeBase {}

export interface ScopeModuleTestVona {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
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
    'test-vona': ScopeModuleTestVona;
  }

  export interface IBeanScopeContainer {
    testVona: ScopeModuleTestVona;
  }

  export interface IBeanScopeConfig {
    'test-vona': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-vona': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `test-vona::${K}` {
  return `test-vona::${key}`;
}
/** scope: end */
