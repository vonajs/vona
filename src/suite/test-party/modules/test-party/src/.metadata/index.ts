/** beans: begin */
export * from '../bean/broadcast.test.js';
export * from '../bean/cli.default.demo.js';
export * from '../bean/event.helloEcho.js';
export * from '../bean/event.loginInfo.js';
export * from '../bean/event.loginInfoDashboard.js';
export * from '../bean/event.userVerify.js';
export * from '../bean/io.message.simpleChat.js';
export * from '../bean/io.message.test.js';
export * from '../bean/sequence.test.js';
export * from '../bean/stats.tasksInstance.js';
export * from '../bean/stats.tasksUser.js';
export * from '../bean/summer.cache.test.js';
export * from '../bean/version.manager.js';
import { BroadcastTest } from '../bean/broadcast.test.js';
import { CliDefaultDemo } from '../bean/cli.default.demo.js';
import { EventHelloEcho } from '../bean/event.helloEcho.js';
import { EventLoginInfo } from '../bean/event.loginInfo.js';
import { EventLoginInfoDashboard } from '../bean/event.loginInfoDashboard.js';
import { EventUserVerify } from '../bean/event.userVerify.js';
import { IoMessageSimpleChat } from '../bean/io.message.simpleChat.js';
import { IoMessageTest } from '../bean/io.message.test.js';
import { SequenceTest } from '../bean/sequence.test.js';
import { StatsTasksInstance } from '../bean/stats.tasksInstance.js';
import { StatsTasksUser } from '../bean/stats.tasksUser.js';
import { SummerCacheTest } from '../bean/summer.cache.test.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'test-party.broadcast.test': BroadcastTest;
    'test-party.cli.default.demo': CliDefaultDemo;
    'test-party.event.helloEcho': EventHelloEcho;
    'test-party.event.loginInfo': EventLoginInfo;
    'test-party.event.loginInfoDashboard': EventLoginInfoDashboard;
    'test-party.event.userVerify': EventUserVerify;
    'test-party.io.message.simpleChat': IoMessageSimpleChat;
    'test-party.io.message.test': IoMessageTest;
    'test-party.sequence.test': SequenceTest;
    'test-party.stats.tasksInstance': StatsTasksInstance;
    'test-party.stats.tasksUser': StatsTasksUser;
    'test-party.summer.cache.test': SummerCacheTest;
    'test-party.version.manager': VersionManager;
  }
}
declare module 'vona-module-test-party' {
  export interface BroadcastTest {
    get scope(): ScopeModuleTestParty;
  }

  export interface CliDefaultDemo {
    get scope(): ScopeModuleTestParty;
  }

  export interface EventHelloEcho {
    get scope(): ScopeModuleTestParty;
  }

  export interface EventLoginInfo {
    get scope(): ScopeModuleTestParty;
  }

  export interface EventLoginInfoDashboard {
    get scope(): ScopeModuleTestParty;
  }

  export interface EventUserVerify {
    get scope(): ScopeModuleTestParty;
  }

  export interface IoMessageSimpleChat {
    get scope(): ScopeModuleTestParty;
  }

  export interface IoMessageTest {
    get scope(): ScopeModuleTestParty;
  }

  export interface SequenceTest {
    get scope(): ScopeModuleTestParty;
  }

  export interface StatsTasksInstance {
    get scope(): ScopeModuleTestParty;
  }

  export interface StatsTasksUser {
    get scope(): ScopeModuleTestParty;
  }

  export interface SummerCacheTest {
    get scope(): ScopeModuleTestParty;
  }

  export interface VersionManager {
    get scope(): ScopeModuleTestParty;
  }
}
/** beans: end */
/** atom: begin */
export * from '../atom/party.js';
export * from '../atom/partyExpense.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'test-party:party': never;
    'test-party:partyExpense': never;
  }
}
declare module 'vona-module-test-party' {
  export interface AtomParty {
    get scope(): ScopeModuleTestParty;
  }

  export interface AtomPartyExpense {
    get scope(): ScopeModuleTestParty;
  }
}
/** atom: end */
/** middleware: begin */
export * from '../bean/middleware.testInterception.js';
export * from '../bean/middleware.testRestructuring.js';

import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecordLocal {
    'test-party:testInterception': never;
    'test-party:testRestructuring': never;
  }
}
declare module 'vona-module-test-party' {
  export interface MiddlewareTestInterception {
    get scope(): ScopeModuleTestParty;
  }

  export interface MiddlewareTestRestructuring {
    get scope(): ScopeModuleTestParty;
  }
}
/** middleware: end */
/** aop: begin */
export * from '../bean/aop.atom.js';

import { IDecoratorAopOptions } from 'vona';
declare module 'vona' {
  export interface IAopRecord {
    'test-party:atom': IDecoratorAopOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface AopAtom {
    get scope(): ScopeModuleTestParty;
  }
}
/** aop: end */
/** entity: begin */
export * from '../entity/party.js';
export * from '../entity/partyExpense.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'test-party:party': IDecoratorEntityOptions;
    'test-party:partyExpense': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-test-party' {}
/** entity: end */
/** model: begin */
export * from '../model/party.js';
export * from '../model/partyExpense.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'test-party:party': IDecoratorModelOptions;
    'test-party:partyExpense': IDecoratorModelOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface ModelParty {
    get scope(): ScopeModuleTestParty;
  }

  export interface ModelPartyExpense {
    get scope(): ScopeModuleTestParty;
  }
}
/** model: end */
/** controller: begin */
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
export * from '../controller/testFeatSendMail.js';
export * from '../controller/testFeatSequence.js';
export * from '../controller/testFeatSettings.js';
export * from '../controller/testFeatSocketio.js';
export * from '../controller/testFeatStats.js';
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

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'test-party:kitchenSinkAutocomplete': IDecoratorControllerOptions;
    'test-party:kitchenSinkFormSchemaValidation': IDecoratorControllerOptions;
    'test-party:kitchenSinkGuide': IDecoratorControllerOptions;
    'test-party:kitchenSinkPtrIsLoadmore': IDecoratorControllerOptions;
    'test-party:testAtomAll': IDecoratorControllerOptions;
    'test-party:testAtomRight': IDecoratorControllerOptions;
    'test-party:testAtomStarLabel': IDecoratorControllerOptions;
    'test-party:testCacheDb': IDecoratorControllerOptions;
    'test-party:testCacheMem': IDecoratorControllerOptions;
    'test-party:testCacheRedis': IDecoratorControllerOptions;
    'test-party:testCtxConfig': IDecoratorControllerOptions;
    'test-party:testCtxLocale': IDecoratorControllerOptions;
    'test-party:testCtxPerformAction': IDecoratorControllerOptions;
    'test-party:testCtxRequest': IDecoratorControllerOptions;
    'test-party:testCtxResponse': IDecoratorControllerOptions;
    'test-party:testCtxSession': IDecoratorControllerOptions;
    'test-party:testCtxTail': IDecoratorControllerOptions;
    'test-party:testCtxTransaction': IDecoratorControllerOptions;
    'test-party:testEventHello': IDecoratorControllerOptions;
    'test-party:testFeatBean': IDecoratorControllerOptions;
    'test-party:testFeatBroadcast': IDecoratorControllerOptions;
    'test-party:testFeatCategory': IDecoratorControllerOptions;
    'test-party:testFeatFieldsRight': IDecoratorControllerOptions;
    'test-party:testFeatHttpLog': IDecoratorControllerOptions;
    'test-party:testFeatInstance': IDecoratorControllerOptions;
    'test-party:testFeatMiddleware': IDecoratorControllerOptions;
    'test-party:testFeatModel': IDecoratorControllerOptions;
    'test-party:testFeatModelWhere': IDecoratorControllerOptions;
    'test-party:testFeatOpenAuth': IDecoratorControllerOptions;
    'test-party:testFeatProgress': IDecoratorControllerOptions;
    'test-party:testFeatSendMail': IDecoratorControllerOptions;
    'test-party:testFeatSequence': IDecoratorControllerOptions;
    'test-party:testFeatSettings': IDecoratorControllerOptions;
    'test-party:testFeatSocketio': IDecoratorControllerOptions;
    'test-party:testFeatStats': IDecoratorControllerOptions;
    'test-party:testFeatTag': IDecoratorControllerOptions;
    'test-party:testFeatValidation': IDecoratorControllerOptions;
    'test-party:testItemOnlyAll': IDecoratorControllerOptions;
    'test-party:testItemOnlyRight': IDecoratorControllerOptions;
    'test-party:testMonkeyMonkeyee': IDecoratorControllerOptions;
    'test-party:testMultilevelAuthorizationRole': IDecoratorControllerOptions;
    'test-party:testMultilevelAuthorizationUser': IDecoratorControllerOptions;
    'test-party:testResourceAll': IDecoratorControllerOptions;
    'test-party:testResourceRight': IDecoratorControllerOptions;
    'test-party:testRoleUserRole': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface ControllerKitchenSinkAutocomplete {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerKitchenSinkFormSchemaValidation {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerKitchenSinkGuide {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerKitchenSinkPtrIsLoadmore {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestAtomAll {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestAtomRight {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestAtomStarLabel {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCacheDb {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCacheMem {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCacheRedis {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxConfig {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxLocale {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxPerformAction {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxRequest {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxResponse {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxSession {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxTail {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxTransaction {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestEventHello {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatBean {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatBroadcast {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatCategory {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatFieldsRight {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatHttpLog {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatInstance {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatMiddleware {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatModel {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatModelWhere {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatOpenAuth {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatProgress {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSendMail {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSequence {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSettings {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSocketio {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatStats {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatTag {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatValidation {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestItemOnlyAll {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestItemOnlyRight {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestMonkeyMonkeyee {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestMultilevelAuthorizationRole {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestMultilevelAuthorizationUser {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestResourceAll {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestResourceRight {
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestRoleUserRole {
    get scope(): ScopeModuleTestParty;
  }
}
/** controller: end */
/** startup: begin */
export * from '../bean/startup.startupAll.js';
export * from '../bean/startup.startupInstance.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'test-party:startupAll': IDecoratorStartupOptions;
    'test-party:startupInstance': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface StartupStartupAll {
    get scope(): ScopeModuleTestParty;
  }

  export interface StartupStartupInstance {
    get scope(): ScopeModuleTestParty;
  }
}
/** startup: end */
/** entities: begin */
import { EntityParty } from '../entity/party.js';
import { EntityPartyExpense } from '../entity/partyExpense.js';
export interface IModuleEntity {
  party: EntityParty;
  partyExpense: EntityPartyExpense;
}
declare module 'vona-module-test-party' {
  export interface EntityParty {
    column: <K extends keyof Omit<EntityParty, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityParty, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityPartyExpense {
    column: <K extends keyof Omit<EntityPartyExpense, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityPartyExpense, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
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
declare module 'vona-module-test-party' {
  export interface ServiceTest {
    get scope(): ScopeModuleTestParty;
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
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleTestParty extends BeanScopeBase {}

export interface ScopeModuleTestParty {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

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
