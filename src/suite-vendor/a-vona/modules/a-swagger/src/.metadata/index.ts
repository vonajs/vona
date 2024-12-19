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
