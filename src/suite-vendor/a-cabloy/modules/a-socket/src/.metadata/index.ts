import type { BeanScopeUtil } from 'vona';
import type { ISocketConnectionOptionsBase } from '../bean/socketConnection.base.ts';
/** service: end */
/** service: begin */

/** service: end */
/** service: begin */
import type { ServiceSocket } from '../service/socket.ts';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** socketConnection: begin */
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/socketConnection.base.ts';
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
/** socketConnection: end */
/** monkey: begin */
export * from '../monkey.ts';
declare module 'vona-module-a-socket' {

  export interface ISocketConnectionRecord {
    'a-socket:base': ISocketConnectionOptionsBase;
  }

}
declare module 'vona-module-a-socket' {

  export interface SocketConnectionBase {
    /** @internal */
    get scope(): ScopeModuleASocket;
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
