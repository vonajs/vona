/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleCmsPluginarticle extends BeanScopeBase {}

export interface ScopeModuleCmsPluginarticle {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  queue: IModuleQueue;
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
