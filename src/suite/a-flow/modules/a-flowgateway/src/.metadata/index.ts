/** beans: begin */
export * from '../bean/flow.node.gatewayExclusive.js';
export * from '../bean/flow.node.gatewayInclusive.js';
export * from '../bean/flow.node.gatewayParallel.js';
export * from '../bean/queue.gateway.js';
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecord {}
}
/** beans: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAFlowgateway extends BeanScopeBase {}

export interface ScopeModuleAFlowgateway
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowgateway': ScopeModuleAFlowgateway;
  }

  export interface IBeanScopeConfig {
    'a-flowgateway': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowgateway': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
