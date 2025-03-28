import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanEvent } from '../bean/bean.event.ts';
/** service: end */
/** service: begin */
import type { ServiceEventListener } from '../service/eventListener.ts';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.event.ts';
declare module 'vona' {

}
declare module 'vona-module-a-event' {

  export interface BeanEvent {
    /** @internal */
    get scope(): ScopeModuleAEvent;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    event: BeanEvent;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/eventListener.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-event:eventListener': never;
  }

}
declare module 'vona-module-a-event' {

  export interface ServiceEventListener {
    /** @internal */
    get scope(): ScopeModuleAEvent;
  }
}
export interface IModuleService {
  eventListener: ServiceEventListener;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-event.service.eventListener': ServiceEventListener;
  }
}

@Scope()
export class ScopeModuleAEvent extends BeanScopeBase {}

export interface ScopeModuleAEvent {
  util: BeanScopeUtil;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-event': ScopeModuleAEvent;
  }

  export interface IBeanScopeContainer {
    event: ScopeModuleAEvent;
  }

}

/** scope: end */
