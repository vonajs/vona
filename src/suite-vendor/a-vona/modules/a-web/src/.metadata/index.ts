/** bean: begin */
export * from '../bean/bean.router.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-web' {
  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
/** bean: end */
/** bean: begin */
import { BeanRouter } from '../bean/bean.router.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/router.js';

import 'vona';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-web:router': never;
  }
}
declare module 'vona-module-a-web' {
  export interface ServiceRouter {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
/** service: end */
/** service: begin */
import { ServiceRouter } from '../service/router.js';
export interface IModuleService {
  router: ServiceRouter;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-web.service.router': ServiceRouter;
  }
}
/** service: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-web': ScopeModuleAWeb;
  }

  export interface IBeanScopeContainer {
    web: ScopeModuleAWeb;
  }
}

/** scope: end */
