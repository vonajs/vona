/** beans: begin */
export * from '../bean/flow.node.gatewayExclusive.js';
export * from '../bean/flow.node.gatewayInclusive.js';
export * from '../bean/flow.node.gatewayParallel.js';
export * from '../bean/version.manager.js';
import { FlowNodeGatewayExclusive } from '../bean/flow.node.gatewayExclusive.js';
import { FlowNodeGatewayInclusive } from '../bean/flow.node.gatewayInclusive.js';
import { FlowNodeGatewayParallel } from '../bean/flow.node.gatewayParallel.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-flowgateway.flow.node.gatewayExclusive': FlowNodeGatewayExclusive;
    'a-flowgateway.flow.node.gatewayInclusive': FlowNodeGatewayInclusive;
    'a-flowgateway.flow.node.gatewayParallel': FlowNodeGatewayParallel;
    'a-flowgateway.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-flowgateway' {
  export interface FlowNodeGatewayExclusive {
    /** @internal */
    get scope(): ScopeModuleAFlowgateway;
  }

  export interface FlowNodeGatewayInclusive {
    /** @internal */
    get scope(): ScopeModuleAFlowgateway;
  }

  export interface FlowNodeGatewayParallel {
    /** @internal */
    get scope(): ScopeModuleAFlowgateway;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAFlowgateway;
  }
}
/** beans: end */
/** queue: begin */
export * from '../bean/queue.gateway.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'a-flowgateway:gateway': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-flowgateway' {
  export interface QueueGateway {
    /** @internal */
    get scope(): ScopeModuleAFlowgateway;
  }
}
/** queue: end */
/** queue: begin */
import { QueueGateway } from '../bean/queue.gateway.js';
export interface IModuleQueue {
  gateway: QueueGateway;
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
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAFlowgateway extends BeanScopeBase {}

export interface ScopeModuleAFlowgateway {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  queue: IModuleQueue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowgateway': ScopeModuleAFlowgateway;
  }

  export interface IBeanScopeContainer {
    flowgateway: ScopeModuleAFlowgateway;
  }

  export interface IBeanScopeConfig {
    'a-flowgateway': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowgateway': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-flowgateway:${K}` {
  return `a-flowgateway:${key}`;
}
/** scope: end */
