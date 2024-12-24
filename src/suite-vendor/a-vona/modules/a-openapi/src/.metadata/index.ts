/** service: begin */
export * from '../service/openapi.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-openapi:openapi': never;
  }
}
declare module 'vona-module-a-openapi' {
  export interface ServiceOpenapi {
    /** @internal */
    get scope(): ScopeModuleAOpenapi;
  }
}
/** service: end */
/** service: begin */
import { ServiceOpenapi } from '../service/openapi.js';
export interface IModuleService {
  openapi: ServiceOpenapi;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-openapi.service.openapi': ServiceOpenapi;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapi extends BeanScopeBase {}

export interface ScopeModuleAOpenapi {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-openapi': ScopeModuleAOpenapi;
  }

  export interface IBeanScopeContainer {
    openapi: ScopeModuleAOpenapi;
  }

  export interface IBeanScopeConfig {
    'a-openapi': ReturnType<typeof config>;
  }
}

/** scope: end */
