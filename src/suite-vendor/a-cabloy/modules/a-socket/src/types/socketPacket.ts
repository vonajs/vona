import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import type { WebSocket } from 'ws';
import type { ISocketPathRecord } from './socketConnection.ts';

export interface ISocketPacketRecord {}

export interface ISocketPacketExecute {
  execute: (data: any, ws: WebSocket, options: IDecoratorSocketPacketOptions, next: Next) => Promise<any>;
}

export interface IDecoratorSocketPacketOptions
  extends IOnionOptionsBase<keyof ISocketPathRecord>,
  IOnionOptionsDeps<keyof ISocketPacketRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    socketPacket: ServiceOnion<IDecoratorSocketPacketOptions, keyof ISocketPacketRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    socketPacket: OmitNever<ISocketPacketRecord>;
  }

  export interface IBeanSceneRecord {
    socketPacket: never;
  }
}
