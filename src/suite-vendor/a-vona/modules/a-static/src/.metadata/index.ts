import type { BeanScopeUtil } from 'vona';
import type { EventOn } from 'vona-module-a-event';

/** event: end */
/** event: begin */
import type { EventResolvePath } from '../bean/event.resolvePath.ts';
/** event: end */
/** event: begin */
import type { TypeEventResolvePathData, TypeEventResolvePathResult } from '../bean/event.resolvePath.ts';
/** middlewareSystem: end */
/** event: begin */
import type { IMiddlewareSystemOptionsStatic } from '../bean/middlewareSystem.static.ts';
/** event: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/event.resolvePath.ts';
declare module 'vona-module-a-aspect' {

  export interface IMiddlewareSystemRecord {
    'a-static:static': IMiddlewareSystemOptionsStatic;
  }

}
declare module 'vona-module-a-static' {

  export interface MiddlewareSystemStatic {
    /** @internal */
    get scope(): ScopeModuleAStatic;
  }
}
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.static.ts';
declare module 'vona' {

}
declare module 'vona-module-a-static' {

  export interface EventResolvePath {
    /** @internal */
    get scope(): ScopeModuleAStatic;
  }
}
export interface IModuleEvent {
  resolvePath: EventResolvePath;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-static:resolvePath': EventOn<TypeEventResolvePathData, TypeEventResolvePathResult>;
  }
}

@Scope()
export class ScopeModuleAStatic extends BeanScopeBase {}

export interface ScopeModuleAStatic {
  util: BeanScopeUtil;
  event: IModuleEvent;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-static': ScopeModuleAStatic;
  }

  export interface IBeanScopeContainer {
    static: ScopeModuleAStatic;
  }

}

/** scope: end */
