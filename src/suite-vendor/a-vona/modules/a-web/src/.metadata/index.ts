/** service: begin */
export * from '../service/router.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-web:router': never;
  }
}
declare module 'vona-module-a-web' {
  export interface ServiceRouter {
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  _bean: TypeModuleBean;
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
