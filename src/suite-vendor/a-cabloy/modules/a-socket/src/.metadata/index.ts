import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { ISocketConnectionOptionsAppReady } from '../bean/socketConnection.appReady.ts';
/** service: end */
/** service: begin */

import type { ISocketConnectionOptionsBase } from '../bean/socketConnection.base.ts';
import type { ISocketConnectionOptionsCors } from '../bean/socketConnection.cors.ts';
import type { ISocketConnectionOptionsInstance } from '../bean/socketConnection.instance.ts';
import type { config } from '../config/config.ts';
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

export * from '../bean/socketConnection.appReady.ts';
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
export * from '../bean/socketConnection.base.ts';
export * from '../bean/socketConnection.cors.ts';
export * from '../bean/socketConnection.instance.ts';
/** socketConnection: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-socket' {

  export interface ISocketConnectionRecord {
    'a-socket:appReady': ISocketConnectionOptionsAppReady;
    'a-socket:base': ISocketConnectionOptionsBase;
    'a-socket:cors': ISocketConnectionOptionsCors;
    'a-socket:instance': ISocketConnectionOptionsInstance;
  }

}
declare module 'vona-module-a-socket' {

  export interface SocketConnectionAppReady {
    /** @internal */
    get scope(): ScopeModuleASocket;
  }

  export interface SocketConnectionBase {
    /** @internal */
    get scope(): ScopeModuleASocket;
  }

  export interface SocketConnectionCors {
    /** @internal */
    get scope(): ScopeModuleASocket;
  }

  export interface SocketConnectionInstance {
    /** @internal */
    get scope(): ScopeModuleASocket;
  }
}
/** config: end */
/** monkey: begin */
export * from '../monkey.ts';
/** service: begin */
export * from '../service/socket.ts';

@Scope()
export class ScopeModuleASocket extends BeanScopeBase {}

export interface ScopeModuleASocket {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-socket': ScopeModuleASocket;
  }

  export interface IBeanScopeContainer {
    socket: ScopeModuleASocket;
  }

  export interface IBeanScopeConfig {
    'a-socket': ReturnType<typeof config>;
  }

}

/** scope: end */
