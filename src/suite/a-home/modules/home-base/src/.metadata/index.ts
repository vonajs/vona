import type { BeanScopeUtil } from 'vona';
import type { EventOn } from 'vona-module-a-event';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
/** event: end */
/** event: begin */
import type { EventRetrieveMenus } from '../bean/event.retrieveMenus.ts';
/** event: end */
/** event: begin */
import type { TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult } from '../bean/event.retrieveMenus.ts';

/** controller: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** event: begin */
import 'vona';

import 'vona';

export * from '../bean/event.retrieveMenus.ts';
declare module 'vona' {

}
declare module 'vona-module-home-base' {

  export interface EventRetrieveMenus {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
export interface IModuleEvent {
  retrieveMenus: EventRetrieveMenus;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'home-base:retrieveMenus': EventOn<TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult>;
  }
}
/** event: end */
/** controller: begin */
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
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/home/base/menu': '/home/base/menu';
  }

}

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
  event: IModuleEvent;
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
