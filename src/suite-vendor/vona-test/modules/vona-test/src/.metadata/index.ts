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
/** aop: begin */
export * from '../bean/aop.regExp.js';
export * from '../bean/aop.simple.js';

import { IDecoratorAopOptions } from 'vona-module-a-aspect';
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

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
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
/** event: begin */
export * from '../bean/event.helloEcho.js';

import { IDecoratorEventOptions } from 'vona-module-a-event';
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

import { IDecoratorEventListenerOptions } from 'vona-module-a-event';
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
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
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
export * from '../bean/schedule.test2.js';

import { IDecoratorScheduleOptions } from 'vona-module-a-schedule';
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
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/vona/test/bean/test': '/vona/test/bean/test';
    '/vona/test/bean/service': '/vona/test/bean/service';
    '/': '/';
    '//echo': '//echo';
    '/vona/test/onion/echo2/:_string_/:_string_': '/vona/test/onion/echo2:_userId_:_userName_';
    '/vona/test/onion/echo2/:userId/:userName': `/vona/test/onion/echo2/${string}/${string}`;
    '/vona/test/onion/echo3/:_string_': '/vona/test/onion/echo3:_userId_';
    '/vona/test/onion/echo3/:userId': `/vona/test/onion/echo3/${string}`;
    '/vona/test/onion/echo5': '/vona/test/onion/echo5';
  }
  export interface IApiPathPostRecord {
    '/vona/test/onion/echo4': '/vona/test/onion/echo4';
    '/vona/test/performAction/echo': '/vona/test/performAction/echo';
    '/vona/test/queue/pushAsync': '/vona/test/queue/pushAsync';
    '/vona/test/queue/push': '/vona/test/queue/push';
    '/vona/test/status': '/vona/test/status';
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
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleVonaTest extends BeanScopeBase {}

export interface ScopeModuleVonaTest {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  summerCache: IModuleSummerCache;
  broadcast: IModuleBroadcast;
  event: IModuleEvent;
  status: MetaStatus;
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
