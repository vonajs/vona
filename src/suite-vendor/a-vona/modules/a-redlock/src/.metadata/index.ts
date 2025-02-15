/** config: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';
/** service: end */
/** service: begin */

import type { config } from '../config/config.js';
/** service: end */
/** service: begin */
import type { ServiceRedlock } from '../service/redlock.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** config: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../config/config.js';
declare module 'vona-module-a-web' {
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
export interface IModuleService {
  redlock: ServiceRedlock;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-redlock.service.redlock': ServiceRedlock;
  }
}
/** service: begin */
export * from '../service/redlock.js';

@Scope()
export class ScopeModuleARedlock extends BeanScopeBase {}

export interface ScopeModuleARedlock {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

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
