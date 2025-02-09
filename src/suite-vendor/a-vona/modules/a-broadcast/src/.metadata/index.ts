/** service: begin */
export * from '../service/broadcast.js';

import 'vona';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-broadcast:broadcast': never;
  }
}
declare module 'vona-module-a-broadcast' {
  export interface ServiceBroadcast {
    /** @internal */
    get scope(): ScopeModuleABroadcast;
  }
}
/** service: end */
/** service: begin */
import { ServiceBroadcast } from '../service/broadcast.js';
export interface IModuleService {
  broadcast: ServiceBroadcast;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-broadcast.service.broadcast': ServiceBroadcast;
  }
}
/** service: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleABroadcast extends BeanScopeBase {}

export interface ScopeModuleABroadcast {
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-broadcast': ScopeModuleABroadcast;
  }

  export interface IBeanScopeContainer {
    broadcast: ScopeModuleABroadcast;
  }
}

/** scope: end */
