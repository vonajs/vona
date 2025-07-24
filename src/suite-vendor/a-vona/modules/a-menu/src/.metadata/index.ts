/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** service: begin */
export * from '../service/menu.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-menu:menu': never;
    }

  
}
declare module 'vona-module-a-menu' {
  
        export interface ServiceMenu {
          /** @internal */
          get scope(): ScopeModuleAMenu;
        }

          export interface ServiceMenu {
            get $beanFullName(): 'a-menu.service.menu';
            get $onionName(): 'a-menu:menu';
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

          export interface EventRetrieveMenus {
            get $beanFullName(): 'a-menu.event.retrieveMenus';
            get $onionName(): 'a-menu:retrieveMenus';
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
      'a-menu:menuGroup': IDtoOptionsMenuGroup;
'a-menu:menuItem': IDtoOptionsMenuItem;
'a-menu:menuItemMeta': IDtoOptionsMenuItemMeta;
'a-menu:menuItemMetaParams': IDtoOptionsMenuItemMetaParams;
'a-menu:menuItemMetaQuery': IDtoOptionsMenuItemMetaQuery;
'a-menu:menus': IDtoOptionsMenus;
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
      fields?: TypeEntityOptionsFields<DtoMenuGroup, IDtoOptionsMenuGroup[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsMenuItem {
      fields?: TypeEntityOptionsFields<DtoMenuItem, IDtoOptionsMenuItem[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsMenuItemMeta {
      fields?: TypeEntityOptionsFields<DtoMenuItemMeta, IDtoOptionsMenuItemMeta[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsMenuItemMetaParams {
      fields?: TypeEntityOptionsFields<DtoMenuItemMetaParams, IDtoOptionsMenuItemMetaParams[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsMenuItemMetaQuery {
      fields?: TypeEntityOptionsFields<DtoMenuItemMetaQuery, IDtoOptionsMenuItemMetaQuery[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsMenus {
      fields?: TypeEntityOptionsFields<DtoMenus, IDtoOptionsMenus[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAMenu extends BeanScopeBase {}

export interface ScopeModuleAMenu {
  util: BeanScopeUtil;
service: IModuleService;
event: IModuleEvent;
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
