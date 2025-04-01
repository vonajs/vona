import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanExecutor } from '../bean/bean.executor.ts';
/** service: end */
/** service: begin */
import type { ServiceExecutor } from '../service/executor.ts';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.executor.ts';
declare module 'vona' {

}
declare module 'vona-module-a-executor' {

  export interface BeanExecutor {
    /** @internal */
    get scope(): ScopeModuleAExecutor;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    executor: BeanExecutor;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/executor.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-executor:executor': never;
  }

}
declare module 'vona-module-a-executor' {

  export interface ServiceExecutor {
    /** @internal */
    get scope(): ScopeModuleAExecutor;
  }
}
export interface IModuleService {
  executor: ServiceExecutor;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-executor.service.executor': ServiceExecutor;
  }
}

@Scope()
export class ScopeModuleAExecutor extends BeanScopeBase {}

export interface ScopeModuleAExecutor {
  util: BeanScopeUtil;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-executor': ScopeModuleAExecutor;
  }

  export interface IBeanScopeContainer {
    executor: ScopeModuleAExecutor;
  }

}

/** scope: end */
