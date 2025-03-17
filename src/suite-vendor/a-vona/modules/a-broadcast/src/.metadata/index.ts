import type { BeanScopeUtil } from 'vona';
/** service: end */
/** service: begin */
import type { ServiceBroadcast } from '../service/broadcast.ts';
/** service: end */
/** service: begin */

/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** monkey: end */
/** main: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../main.ts';
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
export interface IModuleService {
  broadcast: ServiceBroadcast;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-broadcast.service.broadcast': ServiceBroadcast;
  }
}
/** service: end */
/** monkey: begin */
export * from '../monkey.ts';
/** service: begin */
export * from '../service/broadcast.ts';

@Scope()
export class ScopeModuleABroadcast extends BeanScopeBase {}

export interface ScopeModuleABroadcast {
  util: BeanScopeUtil;
  service: IModuleService;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-broadcast': ScopeModuleABroadcast;
  }

  export interface IBeanScopeContainer {
    broadcast: ScopeModuleABroadcast;
  }

}

/** scope: end */
