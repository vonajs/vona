/** beans: begin */
export * from '../bean/cli.default.demo.js';
export * from '../bean/io.message.simpleChat.js';
export * from '../bean/io.message.test.js';
export * from '../bean/sequence.test.js';
export * from '../bean/stats.tasksInstance.js';
export * from '../bean/stats.tasksUser.js';
export * from '../bean/summer.cache.test.js';
export * from '../bean/version.manager.js';
import { CliDefaultDemo } from '../bean/cli.default.demo.js';
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
    'test-party.cli.default.demo': CliDefaultDemo;
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
  export interface CliDefaultDemo {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface IoMessageSimpleChat {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface IoMessageTest {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface SequenceTest {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface StatsTasksInstance {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface StatsTasksUser {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface SummerCacheTest {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/party.js';
export * from '../entity/partyExpense.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'test-party:party': IDecoratorEntityOptions;
    'test-party:partyExpense': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-test-party' {}
/** entity: end */
/** entity: begin */
import { EntityParty } from '../entity/party.js';
import { EntityPartyExpense } from '../entity/partyExpense.js';
export interface IModuleEntity {
  party: EntityParty;
  partyExpense: EntityPartyExpense;
}
/** entity: end */
/** entity: begin */
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
/** entity: end */
/** model: begin */
export * from '../model/party.js';
export * from '../model/partyExpense.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'test-party:party': IDecoratorModelOptions;
    'test-party:partyExpense': IDecoratorModelOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface ModelParty {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ModelPartyExpense {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** model: end */
/** model: begin */
import { ModelParty } from '../model/party.js';
import { ModelPartyExpense } from '../model/partyExpense.js';
export interface IModuleModel {
  party: ModelParty;
  partyExpense: ModelPartyExpense;
}
/** model: end */
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
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface AtomPartyExpense {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** atom: end */
/** middleware: begin */
export * from '../bean/middleware.testInterception.js';
export * from '../bean/middleware.testRestructuring.js';

import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareRecordLocal {
    'test-party:testInterception': never;
    'test-party:testRestructuring': never;
  }
}
declare module 'vona-module-test-party' {
  export interface MiddlewareTestInterception {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface MiddlewareTestRestructuring {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** middleware: end */
/** aop: begin */
export * from '../bean/aop.atom.js';

import { IDecoratorAopOptions } from 'vona-module-a-aspect';
declare module 'vona-module-a-aspect' {
  export interface IAopRecord {
    'test-party:atom': IDecoratorAopOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface AopAtom {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** aop: end */
/** broadcast: begin */
export * from '../bean/broadcast.test.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'test-party:test': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface BroadcastTest {
    /** @internal */
    get scope(): ScopeModuleTestParty;
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
    'test-party:helloEcho': IDecoratorEventOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface EventHelloEcho {
    /** @internal */
    get scope(): ScopeModuleTestParty;
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
export * from '../bean/eventListener.loginInfo.js';
export * from '../bean/eventListener.loginInfoDashboard.js';
export * from '../bean/eventListener.userVerify.js';

import { IDecoratorEventListenerOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  export interface IEventListenerRecord {
    'test-party:loginInfo': IDecoratorEventListenerOptions;
    'test-party:loginInfoDashboard': IDecoratorEventListenerOptions;
    'test-party:userVerify': IDecoratorEventListenerOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface EventListenerLoginInfo {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface EventListenerLoginInfoDashboard {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface EventListenerUserVerify {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** eventListener: end */
/** startup: begin */
export * from '../bean/startup.startupAll.js';
export * from '../bean/startup.startupInstance.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'test-party:startupAll': IDecoratorStartupOptions;
    'test-party:startupInstance': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-test-party' {
  export interface StartupStartupAll {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface StartupStartupInstance {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/test.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'test-party:test': never;
  }
}
declare module 'vona-module-test-party' {
  export interface ServiceTest {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }
}
/** service: end */
/** service: begin */
import { ServiceTest } from '../service/test.js';
export interface IModuleService {
  test: ServiceTest;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'test-party.service.test': ServiceTest;
  }
}
/** service: end */
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

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
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
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerKitchenSinkFormSchemaValidation {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerKitchenSinkGuide {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerKitchenSinkPtrIsLoadmore {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestAtomAll {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestAtomRight {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestAtomStarLabel {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCacheDb {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCacheMem {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCacheRedis {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxConfig {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxLocale {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxPerformAction {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxRequest {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxResponse {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxSession {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxTail {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestCtxTransaction {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatBean {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatBroadcast {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatCategory {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatFieldsRight {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatHttpLog {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatInstance {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatMiddleware {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatModel {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatModelWhere {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatOpenAuth {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatProgress {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSendMail {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSequence {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSettings {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatSocketio {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatStats {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatTag {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestFeatValidation {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestItemOnlyAll {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestItemOnlyRight {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestMonkeyMonkeyee {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestMultilevelAuthorizationRole {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestMultilevelAuthorizationUser {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestResourceAll {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestResourceRight {
    /** @internal */
    get scope(): ScopeModuleTestParty;
  }

  export interface ControllerTestRoleUserRole {
    /** @internal */
    get scope(): ScopeModuleTestParty;
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
export class ScopeModuleTestParty extends BeanScopeBase {}

export interface ScopeModuleTestParty {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  broadcast: IModuleBroadcast;
  event: IModuleEvent;
  service: IModuleService;
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
