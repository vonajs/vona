/** beans: begin */
export * from '../bean/flow.behavior.overtime.js';
export * from '../bean/version.manager.js';
import { FlowBehaviorOvertime } from '../bean/flow.behavior.overtime.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-flowbehavior.flow.behavior.overtime': FlowBehaviorOvertime;
    'a-flowbehavior.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-flowbehavior' {
  export interface FlowBehaviorOvertime {
    /** @internal */
    get scope(): ScopeModuleAFlowbehavior;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAFlowbehavior;
  }
}
/** beans: end */
/** queue: begin */
export * from '../bean/queue.overtime.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'a-flowbehavior:overtime': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-flowbehavior' {
  export interface QueueOvertime {
    /** @internal */
    get scope(): ScopeModuleAFlowbehavior;
  }
}
/** queue: end */
/** queue: begin */
import { QueueOvertime } from '../bean/queue.overtime.js';
export interface IModuleQueue {
  overtime: QueueOvertime;
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
export class ScopeModuleAFlowbehavior extends BeanScopeBase {}

export interface ScopeModuleAFlowbehavior {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  queue: IModuleQueue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowbehavior': ScopeModuleAFlowbehavior;
  }

  export interface IBeanScopeContainer {
    flowbehavior: ScopeModuleAFlowbehavior;
  }

  export interface IBeanScopeConfig {
    'a-flowbehavior': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowbehavior': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-flowbehavior:${K}` {
  return `a-flowbehavior:${key}`;
}
/** scope: end */
