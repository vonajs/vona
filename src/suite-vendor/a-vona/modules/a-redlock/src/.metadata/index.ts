/** service: begin */
export * from '../service/redlock.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-redlock:redlock': never;
  }
}
declare module 'vona-module-a-redlock' {
  export interface ServiceRedlock {
    /** @internal */
    get scope(): ScopeModuleARedlock;
  }
}
/** service: end */
/** service: begin */
import { ServiceRedlock } from '../service/redlock.js';
export interface IModuleService {
  redlock: ServiceRedlock;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-redlock.service.redlock': ServiceRedlock;
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
export class ScopeModuleARedlock extends BeanScopeBase {}

export interface ScopeModuleARedlock {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-redlock': ScopeModuleARedlock;
  }

  export interface IBeanScopeContainer {
    redlock: ScopeModuleARedlock;
  }

  export interface IBeanScopeConfig {
    'a-redlock': ReturnType<typeof config>;
  }
}

/** scope: end */
