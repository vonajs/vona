/** beans: begin */
export * from '../bean/aop.atom.js';
export * from '../bean/aop.regExp.js';
export * from '../bean/aop.simple.js';
export * from '../bean/broadcast.test.js';
export * from '../bean/cli.default.demo.js';
export * from '../bean/event.helloEcho.js';
export * from '../bean/event.loginInfo.js';
export * from '../bean/event.loginInfoDashboard.js';
export * from '../bean/event.userVerify.js';
export * from '../bean/io.message.simpleChat.js';
export * from '../bean/io.message.test.js';
export * from '../bean/middleware.testInterception.js';
export * from '../bean/middleware.testRestructuring.js';
export * from '../bean/queue.test.js';
export * from '../bean/schedule.test.js';
export * from '../bean/sequence.test.js';
export * from '../bean/startup.startupAll.js';
export * from '../bean/startup.startupInstance.js';
export * from '../bean/stats.tasksInstance.js';
export * from '../bean/stats.tasksUser.js';
export * from '../bean/summer.cache.test.js';
export * from '../bean/test.app.js';
export * from '../bean/test.class.js';
export * from '../bean/test.ctx.js';
export * from '../bean/test.ctx0.js';
export * from '../bean/test.ctx1.js';
export * from '../bean/version.manager.js';
import { AopAtom } from '../bean/aop.atom.js';
import { AopRegExp } from '../bean/aop.regExp.js';
import { AopSimple } from '../bean/aop.simple.js';
import { BroadcastTest } from '../bean/broadcast.test.js';
import { CliDefaultDemo } from '../bean/cli.default.demo.js';
import { EventHelloEcho } from '../bean/event.helloEcho.js';
import { EventLoginInfo } from '../bean/event.loginInfo.js';
import { EventLoginInfoDashboard } from '../bean/event.loginInfoDashboard.js';
import { EventUserVerify } from '../bean/event.userVerify.js';
import { IoMessageSimpleChat } from '../bean/io.message.simpleChat.js';
import { IoMessageTest } from '../bean/io.message.test.js';
import { MiddlewareTestInterception } from '../bean/middleware.testInterception.js';
import { MiddlewareTestRestructuring } from '../bean/middleware.testRestructuring.js';
import { QueueTest } from '../bean/queue.test.js';
import { ScheduleTest } from '../bean/schedule.test.js';
import { SequenceTest } from '../bean/sequence.test.js';
import { StartupStartupAll } from '../bean/startup.startupAll.js';
import { StartupStartupInstance } from '../bean/startup.startupInstance.js';
import { StatsTasksInstance } from '../bean/stats.tasksInstance.js';
import { StatsTasksUser } from '../bean/stats.tasksUser.js';
import { SummerCacheTest } from '../bean/summer.cache.test.js';
import { TestApp } from '../bean/test.app.js';
import { TestClass } from '../bean/test.class.js';
import { TestCtx } from '../bean/test.ctx.js';
import { TestCtx0 } from '../bean/test.ctx0.js';
import { TestCtx1 } from '../bean/test.ctx1.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'test-party.aop.atom': AopAtom;
    'test-party.aop.regExp': AopRegExp;
    'test-party.aop.simple': AopSimple;
    'test-party.broadcast.test': BroadcastTest;
    'test-party.cli.default.demo': CliDefaultDemo;
    'test-party.event.helloEcho': EventHelloEcho;
    'test-party.event.loginInfo': EventLoginInfo;
    'test-party.event.loginInfoDashboard': EventLoginInfoDashboard;
    'test-party.event.userVerify': EventUserVerify;
    'test-party.io.message.simpleChat': IoMessageSimpleChat;
    'test-party.io.message.test': IoMessageTest;
    'test-party.middleware.testInterception': MiddlewareTestInterception;
    'test-party.middleware.testRestructuring': MiddlewareTestRestructuring;
    'test-party.queue.test': QueueTest;
    'test-party.schedule.test': ScheduleTest;
    'test-party.sequence.test': SequenceTest;
    'test-party.startup.startupAll': StartupStartupAll;
    'test-party.startup.startupInstance': StartupStartupInstance;
    'test-party.stats.tasksInstance': StatsTasksInstance;
    'test-party.stats.tasksUser': StatsTasksUser;
    'test-party.summer.cache.test': SummerCacheTest;
    'test-party.test.app': TestApp;
    'test-party.test.class': TestClass;
    'test-party.test.ctx': TestCtx;
    'test-party.test.ctx0': TestCtx0;
    'test-party.test.ctx1': TestCtx1;
    'test-party.version.manager': VersionManager;
  }
}
/** beans: end */
/** atoms: begin */
export * from '../atom/party.js';
export * from '../atom/partyExpense.js';
/** atoms: end */
/** entities: begin */
export * from '../entity/party.js';
export * from '../entity/partyExpense.js';
/** entities: end */
/** models: begin */
export * from '../model/party.js';
export * from '../model/partyExpense.js';
import { ModelParty } from '../model/party.js';
import { ModelPartyExpense } from '../model/partyExpense.js';
export interface IModuleModel {
  party: ModelParty;
  partyExpense: ModelPartyExpense;
}
/** models: end */
/** services: begin */
export * from '../service/test.js';
import { ServiceTest } from '../service/test.js';
export interface IModuleService {
  test: ServiceTest;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'test-party.service.test': ServiceTest;
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
export class ScopeModuleTestParty extends BeanScopeBase {}

export interface ScopeModuleTestParty
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    any,
    IModuleService,
    IModuleModel
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'test-party': ScopeModuleTestParty;
  }

  export interface IBeanScopeConfig {
    'test-party': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-party': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
