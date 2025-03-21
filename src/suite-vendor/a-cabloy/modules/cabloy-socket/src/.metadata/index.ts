import type { BeanScopeUtil } from 'vona';
/** socketConnection: begin */
import type { ISocketConnectionOptionsCabloy } from '../bean/socketConnection.cabloy.ts';
import type { ISocketPacketOptionsCabloy } from '../bean/socketPacket.cabloy.ts';
import type { ISocketPacketOptionsPerformAction } from '../bean/socketPacket.performAction.ts';
/** socketPacket: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/socketConnection.cabloy.ts';
declare module 'vona-module-a-socket' {

  export interface ISocketConnectionRecord {
    'cabloy-socket:cabloy': ISocketConnectionOptionsCabloy;
  }

}
declare module 'vona-module-cabloy-socket' {

  export interface SocketConnectionCabloy {
    /** @internal */
    get scope(): ScopeModuleCabloySocket;
  }
}
/** socketConnection: end */
/** socketPacket: begin */
export * from '../bean/socketPacket.cabloy.ts';
export * from '../bean/socketPacket.performAction.ts';
declare module 'vona-module-a-socket' {

  export interface ISocketPacketRecord {
    'cabloy-socket:cabloy': ISocketPacketOptionsCabloy;
    'cabloy-socket:performAction': ISocketPacketOptionsPerformAction;
  }

}
declare module 'vona-module-cabloy-socket' {

  export interface SocketPacketCabloy {
    /** @internal */
    get scope(): ScopeModuleCabloySocket;
  }

  export interface SocketPacketPerformAction {
    /** @internal */
    get scope(): ScopeModuleCabloySocket;
  }
}

@Scope()
export class ScopeModuleCabloySocket extends BeanScopeBase {}

export interface ScopeModuleCabloySocket {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cabloy-socket': ScopeModuleCabloySocket;
  }

  export interface IBeanScopeContainer {
    cabloySocket: ScopeModuleCabloySocket;
  }

}

/** scope: end */
