/** beans: begin */
export * from '../bean/queue.submit.js';
import { QueueSubmit } from '../bean/queue.submit.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'cms-pluginsubmit.queue.submit': QueueSubmit;
  }
}
/** beans: end */
/** services: begin */
export * from '../service/tools.js';
import { ServiceTools } from '../service/tools.js';
export interface IModuleService {
  tools: ServiceTools;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'cms-pluginsubmit.service.tools': ServiceTools;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleCmsPluginsubmit extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsubmit {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
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
