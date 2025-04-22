import type { BeanScopeUtil } from 'vona';
/** dto: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** dto: begin */
import 'vona';

import 'vona';

export * from '../dto/menuGroup.ts';
export * from '../dto/menuItem.ts';
export * from '../dto/menusAndGroups.ts';
declare module 'vona' {

  export interface IDtoRecord {
    'a-menu:menuGroup': never;
    'a-menu:menuItem': never;
    'a-menu:menusAndGroups': never;
  }

}
declare module 'vona-module-a-menu' {

}

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
