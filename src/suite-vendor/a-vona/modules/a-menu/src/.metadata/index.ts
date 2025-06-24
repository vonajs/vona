/* eslint-disable */
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** event: begin */
export * from '../bean/event.retrieveMenus.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-menu' {
  
        export interface EventRetrieveMenus {
          /** @internal */
          get scope(): ScopeModuleAMenu;
        } 
}
/** event: end */
/** event: begin */
import type { EventRetrieveMenus } from '../bean/event.retrieveMenus.ts';
export interface IModuleEvent {
  'retrieveMenus': EventRetrieveMenus;
}
/** event: end */
/** event: begin */
import type { TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult } from '../bean/event.retrieveMenus.ts';
import type { EventOn } from 'vona-module-a-event'; 
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
import type { IDtoOptionsMenuGroup } from '../dto/menuGroup.ts';
import type { IDtoOptionsMenuItem } from '../dto/menuItem.ts';
import type { IDtoOptionsMenuItemMeta } from '../dto/menuItemMeta.ts';
import type { IDtoOptionsMenuItemMetaParams } from '../dto/menuItemMetaParams.ts';
import type { IDtoOptionsMenuItemMetaQuery } from '../dto/menuItemMetaQuery.ts';
import type { IDtoOptionsMenus } from '../dto/menus.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'a-menu:menuGroup': Omit<IDtoOptionsMenuGroup, '_fieldsMore_'>;
'a-menu:menuItem': Omit<IDtoOptionsMenuItem, '_fieldsMore_'>;
'a-menu:menuItemMeta': Omit<IDtoOptionsMenuItemMeta, '_fieldsMore_'>;
'a-menu:menuItemMetaParams': Omit<IDtoOptionsMenuItemMetaParams, '_fieldsMore_'>;
'a-menu:menuItemMetaQuery': Omit<IDtoOptionsMenuItemMetaQuery, '_fieldsMore_'>;
'a-menu:menus': Omit<IDtoOptionsMenus, '_fieldsMore_'>;
    }

  
}
declare module 'vona-module-a-menu' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoMenuGroup } from '../dto/menuGroup.ts';
import type { DtoMenuItem } from '../dto/menuItem.ts';
import type { DtoMenuItemMeta } from '../dto/menuItemMeta.ts';
import type { DtoMenuItemMetaParams } from '../dto/menuItemMetaParams.ts';
import type { DtoMenuItemMetaQuery } from '../dto/menuItemMetaQuery.ts';
import type { DtoMenus } from '../dto/menus.ts'; 
declare module 'vona-module-a-menu' {
  
    export interface IDtoOptionsMenuGroup {
      fields?: TypeEntityOptionsFields<DtoMenuGroup, IDtoOptionsMenuGroup['_fieldsMore_']>;
    }

    export interface IDtoOptionsMenuItem {
      fields?: TypeEntityOptionsFields<DtoMenuItem, IDtoOptionsMenuItem['_fieldsMore_']>;
    }

    export interface IDtoOptionsMenuItemMeta {
      fields?: TypeEntityOptionsFields<DtoMenuItemMeta, IDtoOptionsMenuItemMeta['_fieldsMore_']>;
    }

    export interface IDtoOptionsMenuItemMetaParams {
      fields?: TypeEntityOptionsFields<DtoMenuItemMetaParams, IDtoOptionsMenuItemMetaParams['_fieldsMore_']>;
    }

    export interface IDtoOptionsMenuItemMetaQuery {
      fields?: TypeEntityOptionsFields<DtoMenuItemMetaQuery, IDtoOptionsMenuItemMetaQuery['_fieldsMore_']>;
    }

    export interface IDtoOptionsMenus {
      fields?: TypeEntityOptionsFields<DtoMenus, IDtoOptionsMenus['_fieldsMore_']>;
    }
}
/** dto: end */
/** service: begin */
export * from '../service/menu.ts';

import 'vona';
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
/** service: end */
/** service: begin */
import type { ServiceMenu } from '../service/menu.ts';
export interface IModuleService {
  'menu': ServiceMenu;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-menu.service.menu': ServiceMenu;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAMenu extends BeanScopeBase {}

export interface ScopeModuleAMenu {
  util: BeanScopeUtil;
event: IModuleEvent;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-menu': ScopeModuleAMenu;
  }

  export interface IBeanScopeContainer {
    menu: ScopeModuleAMenu;
  }
  
  

  
}

/** scope: end */
