/** beans: begin */
export * from '../bean/aop.atom.js';
export * from '../bean/broadcast.test.js';
export * from '../bean/cli.default.demo.js';
export * from '../bean/event.helloEcho.js';
export * from '../bean/event.loginInfo.js';
export * from '../bean/event.loginInfoDashboard.js';
export * from '../bean/event.userVerify.js';
export * from '../bean/io.message.simpleChat.js';
export * from '../bean/io.message.test.js';
export * from '../bean/queue.test.js';
export * from '../bean/schedule.test.js';
export * from '../bean/sequence.test.js';
export * from '../bean/startup.startupAll.js';
export * from '../bean/startup.startupInstance.js';
export * from '../bean/stats.tasksInstance.js';
export * from '../bean/stats.tasksUser.js';
export * from '../bean/summer.cache.test.js';
export * from '../bean/version.manager.js';
import { AopAtom } from '../bean/aop.atom.js';
import { BroadcastTest } from '../bean/broadcast.test.js';
import { CliDefaultDemo } from '../bean/cli.default.demo.js';
import { EventHelloEcho } from '../bean/event.helloEcho.js';
import { EventLoginInfo } from '../bean/event.loginInfo.js';
import { EventLoginInfoDashboard } from '../bean/event.loginInfoDashboard.js';
import { EventUserVerify } from '../bean/event.userVerify.js';
import { IoMessageSimpleChat } from '../bean/io.message.simpleChat.js';
import { IoMessageTest } from '../bean/io.message.test.js';
import { QueueTest } from '../bean/queue.test.js';
import { ScheduleTest } from '../bean/schedule.test.js';
import { SequenceTest } from '../bean/sequence.test.js';
import { StartupStartupAll } from '../bean/startup.startupAll.js';
import { StartupStartupInstance } from '../bean/startup.startupInstance.js';
import { StatsTasksInstance } from '../bean/stats.tasksInstance.js';
import { StatsTasksUser } from '../bean/stats.tasksUser.js';
import { SummerCacheTest } from '../bean/summer.cache.test.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'test-party.aop.atom': AopAtom;
    'test-party.broadcast.test': BroadcastTest;
    'test-party.cli.default.demo': CliDefaultDemo;
    'test-party.event.helloEcho': EventHelloEcho;
    'test-party.event.loginInfo': EventLoginInfo;
    'test-party.event.loginInfoDashboard': EventLoginInfoDashboard;
    'test-party.event.userVerify': EventUserVerify;
    'test-party.io.message.simpleChat': IoMessageSimpleChat;
    'test-party.io.message.test': IoMessageTest;
    'test-party.queue.test': QueueTest;
    'test-party.schedule.test': ScheduleTest;
    'test-party.sequence.test': SequenceTest;
    'test-party.startup.startupAll': StartupStartupAll;
    'test-party.startup.startupInstance': StartupStartupInstance;
    'test-party.stats.tasksInstance': StatsTasksInstance;
    'test-party.stats.tasksUser': StatsTasksUser;
    'test-party.summer.cache.test': SummerCacheTest;
    'test-party.version.manager': VersionManager;
  }
}
/** beans: end */
/** middlewares: begin */
export * from '../bean/middleware.testInterception.js';
export * from '../bean/middleware.testRestructuring.js';

import 'vona';
declare module 'vona' {}
/** middlewares: end */
/** atoms: begin */
export * from '../atom/party.js';
export * from '../atom/partyExpense.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/kitchenSinkAutocomplete.js';
export * from '../controller/kitchenSinkFormSchemaValidation.js';
export * from '../controller/kitchenSinkGuide.js';
export * from '../controller/kitchenSinkPtrIsLoadmore.js';
export * from '../controller/testAtomAll.js';
export * from '../controller/testAtomRight.js';
export * from '../controller/testAtomStarLabel.js';
export * from '../controller/testCacheDb.js';
export * from '../controller/testCacheMem.js';
export * from '../controller/testCacheRedis.js';
export * from '../controller/testCtxConfig.js';
export * from '../controller/testCtxLocale.js';
export * from '../controller/testCtxPerformAction.js';
export * from '../controller/testCtxRequest.js';
export * from '../controller/testCtxResponse.js';
export * from '../controller/testCtxSession.js';
export * from '../controller/testCtxTail.js';
export * from '../controller/testCtxTransaction.js';
export * from '../controller/testEventHello.js';
export * from '../controller/testFeatBean.js';
export * from '../controller/testFeatBroadcast.js';
export * from '../controller/testFeatCategory.js';
export * from '../controller/testFeatFieldsRight.js';
export * from '../controller/testFeatHttpLog.js';
export * from '../controller/testFeatInstance.js';
export * from '../controller/testFeatMiddleware.js';
export * from '../controller/testFeatModel.js';
export * from '../controller/testFeatModelWhere.js';
export * from '../controller/testFeatOpenAuth.js';
export * from '../controller/testFeatProgress.js';
export * from '../controller/testFeatQueue.js';
export * from '../controller/testFeatSendMail.js';
export * from '../controller/testFeatSequence.js';
export * from '../controller/testFeatSettings.js';
export * from '../controller/testFeatSocketio.js';
export * from '../controller/testFeatStats.js';
export * from '../controller/testFeatStatus.js';
export * from '../controller/testFeatSummer.js';
export * from '../controller/testFeatTag.js';
export * from '../controller/testFeatValidation.js';
export * from '../controller/testItemOnlyAll.js';
export * from '../controller/testItemOnlyRight.js';
export * from '../controller/testMonkeyMonkeyee.js';
export * from '../controller/testMultilevelAuthorizationRole.js';
export * from '../controller/testMultilevelAuthorizationUser.js';
export * from '../controller/testResourceAll.js';
export * from '../controller/testResourceRight.js';
export * from '../controller/testRoleUserRole.js';
/** controllers: end */
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
  export interface IBeanRecordGeneral {
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
    never,
    IModuleService,
    IModuleModel
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'test-party': ScopeModuleTestParty;
  }

  export interface IBeanScopeContainer {
    testParty: ScopeModuleTestParty;
  }

  export interface IBeanScopeConfig {
    'test-party': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-party': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `test-party:${K}` {
  return `test-party:${key}`;
}
/** scope: end */
