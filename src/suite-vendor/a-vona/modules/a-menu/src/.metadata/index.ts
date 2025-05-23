import type { BeanScopeUtil } from 'vona';

import type { EventOn } from 'vona-module-a-event';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** event: end */
/** event: begin */
import type { EventRetrieveMenus } from '../bean/event.retrieveMenus.ts';
/** event: end */
/** event: begin */
import type { TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult } from '../bean/event.retrieveMenus.ts';
import type { IDtoOptionsMenuGroup } from '../dto/menuGroup.ts';
/** dto: end */
/** dto: begin */
import type { DtoMenuGroup } from '../dto/menuGroup.ts';
import type { IDtoOptionsMenuItem } from '../dto/menuItem.ts';
import type { DtoMenuItem } from '../dto/menuItem.ts';
import type { IDtoOptionsMenuItemMeta } from '../dto/menuItemMeta.ts';
import type { DtoMenuItemMeta } from '../dto/menuItemMeta.ts';
import type { IDtoOptionsItemMetaParams } from '../dto/menuItemMetaParams.ts';
import type { DtoMenuItemMetaParams } from '../dto/menuItemMetaParams.ts';
import type { IDtoOptionsItemMetaQuery } from '../dto/menuItemMetaQuery.ts';
import type { DtoMenuItemMetaQuery } from '../dto/menuItemMetaQuery.ts';
import type { IDtoOptionsMenus } from '../dto/menus.ts';
import type { DtoMenus } from '../dto/menus.ts';
/** service: end */
/** service: begin */
import type { ServiceMenu } from '../service/menu.ts';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';

import 'vona';
/** event: begin */
export * from '../bean/event.retrieveMenus.ts';
declare module 'vona' {

}
declare module 'vona-module-a-menu' {

  export interface EventRetrieveMenus {
    /** @internal */
    get scope(): ScopeModuleAMenu;
  }
}
export interface IModuleEvent {
  retrieveMenus: EventRetrieveMenus;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-menu:retrieveMenus': EventOn<TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult>;
  }
}
/** event: end */
/** dto: begin */
export * from '../dto/menuGroup.ts';
export * from '../dto/menuItem.ts';
export * from '../dto/menuItemMeta.ts';
export * from '../dto/menuItemMetaParams.ts';
export * from '../dto/menuItemMetaQuery.ts';
export * from '../dto/menus.ts';
declare module 'vona-module-a-web' {

  export interface IDtoRecord {
    'a-menu:menuGroup': IDtoOptionsMenuGroup;
    'a-menu:menuItem': IDtoOptionsMenuItem;
    'a-menu:menuItemMeta': IDtoOptionsMenuItemMeta;
    'a-menu:menuItemMetaParams': IDtoOptionsItemMetaParams;
    'a-menu:menuItemMetaQuery': IDtoOptionsItemMetaQuery;
    'a-menu:menus': IDtoOptionsMenus;
  }

}
declare module 'vona-module-a-menu' {

}
declare module 'vona-module-a-menu' {

  export interface IDtoOptionsMenuGroup {
    fields?: TypeEntityOptionsFields<DtoMenuGroup>;
  }

  export interface IDtoOptionsMenuItem {
    fields?: TypeEntityOptionsFields<DtoMenuItem>;
  }

  export interface IDtoOptionsMenuItemMeta {
    fields?: TypeEntityOptionsFields<DtoMenuItemMeta>;
  }

  export interface IDtoOptionsMenuItemMetaParams {
    fields?: TypeEntityOptionsFields<DtoMenuItemMetaParams>;
  }

  export interface IDtoOptionsMenuItemMetaQuery {
    fields?: TypeEntityOptionsFields<DtoMenuItemMetaQuery>;
  }

  export interface IDtoOptionsMenus {
    fields?: TypeEntityOptionsFields<DtoMenus>;
  }
}
/** dto: end */
/** service: begin */
export * from '../service/menu.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-menu:menu': never;
  }

}
declare module 'vona-module-a-menu' {

  export interface ServiceMenu {
    /** @internal */
    get scope(): ScopeModuleAMenu;
  }
}
export interface IModuleService {
  menu: ServiceMenu;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-menu.service.menu': ServiceMenu;
  }
}

@Scope()
export class ScopeModuleAMenu extends BeanScopeBase {}

export interface ScopeModuleAMenu {
  util: BeanScopeUtil;
  event: IModuleEvent;
  service: IModuleService;
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
