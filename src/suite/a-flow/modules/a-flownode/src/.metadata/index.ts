/** beans: begin */
export * from '../bean/flow.edge.sequence.js';
export * from '../bean/flow.node.activityNone.js';
export * from '../bean/flow.node.activityService.js';
export * from '../bean/flow.node.endEventNone.js';
export * from '../bean/flow.node.startEventNone.js';
export * from '../bean/flow.node.startEventTimer.js';
export * from '../bean/queue.startEventTimer.js';
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
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
export class ScopeModuleAFlownode extends BeanScopeBase {}

export interface ScopeModuleAFlownode
  extends TypeModuleResource<typeof config, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flownode': ScopeModuleAFlownode;
  }

  export interface IBeanScopeContainer {
    flownode: ScopeModuleAFlownode;
  }

  export interface IBeanScopeConfig {
    'a-flownode': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flownode': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
