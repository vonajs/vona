/** queue: begin */
export * from '../bean/queue.submit.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'cms-pluginsubmit:submit': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-cms-pluginsubmit' {
  export interface QueueSubmit {
    /** @internal */
    get scope(): ScopeModuleCmsPluginsubmit;
  }
}
/** queue: end */
/** queue: begin */
import { QueueSubmit } from '../bean/queue.submit.js';
export interface IModuleQueue {
  submit: QueueSubmit;
}
/** queue: end */
/** service: begin */
export * from '../service/tools.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'cms-pluginsubmit:tools': never;
  }
}
declare module 'vona-module-cms-pluginsubmit' {
  export interface ServiceTools {
    /** @internal */
    get scope(): ScopeModuleCmsPluginsubmit;
  }
}
/** service: end */
/** service: begin */
import { ServiceTools } from '../service/tools.js';
export interface IModuleService {
  tools: ServiceTools;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'cms-pluginsubmit.service.tools': ServiceTools;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPluginsubmit extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsubmit {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  queue: IModuleQueue;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginsubmit': ScopeModuleCmsPluginsubmit;
  }

  export interface IBeanScopeContainer {
    cmsPluginsubmit: ScopeModuleCmsPluginsubmit;
  }

  export interface IBeanScopeConfig {
    'cms-pluginsubmit': ReturnType<typeof config>;
  }
}

/** scope: end */
