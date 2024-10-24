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
export * from '../bean/test.ctx_0.js';
export * from '../bean/test.ctx_1.js';
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecord {}
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
