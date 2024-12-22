/** controller: begin */
export * from '../controller/swagger.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-swagger:swagger': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-swagger' {
  export interface ControllerSwagger {
    /** @internal */
    get scope(): ScopeModuleASwagger;
  }
}
/** controller: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASwagger extends BeanScopeBase {}

export interface ScopeModuleASwagger {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-swagger': ScopeModuleASwagger;
  }

  export interface IBeanScopeContainer {
    swagger: ScopeModuleASwagger;
  }
}

/** scope: end */
