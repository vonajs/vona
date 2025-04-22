import type { BeanScopeUtil } from 'vona';
/** controller: begin */
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
/** controller: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

export * from '../controller/menu.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'home-base:menu': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-home-base' {

  export interface ControllerMenu {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }

}

/** scope: end */
