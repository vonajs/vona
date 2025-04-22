import type { BeanScopeUtil } from 'vona';
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleAMenu extends BeanScopeBase {}

export interface ScopeModuleAMenu {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-menu': ScopeModuleAMenu;
  }

  export interface IBeanScopeContainer {
    menu: ScopeModuleAMenu;
  }

}

/** scope: end */
