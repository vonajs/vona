/** beans: begin */
export * from '../bean/flow.edge.sequence.js';
export * from '../bean/flow.node.activityNone.js';
export * from '../bean/flow.node.activityService.js';
export * from '../bean/flow.node.endEventNone.js';
export * from '../bean/flow.node.startEventNone.js';
export * from '../bean/flow.node.startEventTimer.js';
export * from '../bean/version.manager.js';
import { FlowEdgeSequence } from '../bean/flow.edge.sequence.js';
import { FlowNodeActivityNone } from '../bean/flow.node.activityNone.js';
import { FlowNodeActivityService } from '../bean/flow.node.activityService.js';
import { FlowNodeEndEventNone } from '../bean/flow.node.endEventNone.js';
import { FlowNodeStartEventNone } from '../bean/flow.node.startEventNone.js';
import { FlowNodeStartEventTimer } from '../bean/flow.node.startEventTimer.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-flownode.flow.edge.sequence': FlowEdgeSequence;
    'a-flownode.flow.node.activityNone': FlowNodeActivityNone;
    'a-flownode.flow.node.activityService': FlowNodeActivityService;
    'a-flownode.flow.node.endEventNone': FlowNodeEndEventNone;
    'a-flownode.flow.node.startEventNone': FlowNodeStartEventNone;
    'a-flownode.flow.node.startEventTimer': FlowNodeStartEventTimer;
    'a-flownode.version.manager': VersionManager;
  }
}
/** beans: end */
/** queue: begin */
export * from '../bean/queue.startEventTimer.js';
export * from '../bean/queue.startEventTimer_.js';

import { IDecoratorQueueOptions } from 'vona';
declare module 'vona' {
  export interface IQueueRecord {
    'a-flownode:startEventTimer': IDecoratorQueueOptions;
  }
}
/** queue: end */
/** queue: begin */
import { QueueStartEventTimer } from '../bean/queue.startEventTimer.js';
export interface IModuleQueue {
  startEventTimer: QueueStartEventTimer;
}
/** queue: end */
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
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAFlownode extends BeanScopeBase {}

export interface ScopeModuleAFlownode {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  queue: IModuleQueue;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-flownode:${K}` {
  return `a-flownode:${key}`;
}
/** scope: end */
