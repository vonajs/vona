import type { BeanScopeUtil } from 'vona';
/** socketPacket: begin */
import type { ISocketPacketOptionsCabloy } from '../bean/socketPacket.cabloy.ts';
/** socketPacket: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/socketPacket.cabloy.ts';
declare module 'vona-module-a-socket' {

  export interface ISocketPacketRecord {
    'cabloy-socket:cabloy': ISocketPacketOptionsCabloy;
  }

}
declare module 'vona-module-cabloy-socket' {

  export interface SocketPacketCabloy {
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
