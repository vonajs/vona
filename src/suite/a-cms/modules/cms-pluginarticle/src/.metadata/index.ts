/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPluginarticle extends BeanScopeBase {}

export interface ScopeModuleCmsPluginarticle {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginarticle': ScopeModuleCmsPluginarticle;
  }

  export interface IBeanScopeContainer {
    cmsPluginarticle: ScopeModuleCmsPluginarticle;
  }
}

/** scope: end */
