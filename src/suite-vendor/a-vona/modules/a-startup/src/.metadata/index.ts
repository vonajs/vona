/** services: begin */
export * from '../service/startup.js';
import { ServiceStartup } from '../service/startup.js';
export interface IModuleService {
  startup: ServiceStartup;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-startup.service.startup': ServiceStartup;
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
export class ScopeModuleAStartup extends BeanScopeBase {}

export interface ScopeModuleAStartup {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-startup': ScopeModuleAStartup;
  }

  export interface IBeanScopeContainer {
    startup: ScopeModuleAStartup;
  }

  export interface IBeanScopeConfig {
    'a-startup': ReturnType<typeof config>;
  }
}

/** scope: end */
