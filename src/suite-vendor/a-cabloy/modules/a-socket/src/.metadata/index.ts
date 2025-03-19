import type { BeanScopeUtil } from 'vona';
/** service: end */
/** service: begin */
import type { ServiceSocket } from '../service/socket.ts';
/** service: end */
/** service: begin */

/** monkey: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** monkey: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../monkey.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-socket:socket': never;
  }

}
declare module 'vona-module-a-socket' {

  export interface ServiceSocket {
    /** @internal */
    get scope(): ScopeModuleASocket;
  }
}
export interface IModuleService {
  socket: ServiceSocket;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-socket.service.socket': ServiceSocket;
  }
}
/** service: begin */
export * from '../service/socket.ts';

@Scope()
export class ScopeModuleASocket extends BeanScopeBase {}

export interface ScopeModuleASocket {
  util: BeanScopeUtil;
  service: IModuleService;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-socket': ScopeModuleASocket;
  }

  export interface IBeanScopeContainer {
    socket: ScopeModuleASocket;
  }

}

/** scope: end */
