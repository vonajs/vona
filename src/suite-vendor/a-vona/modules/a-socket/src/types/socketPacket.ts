import { Next, OmitNever } from 'vona';
import { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import { ISocketPathRecord } from './socketConnection.js';

export interface ISocketPacketRecord {}

export interface ISocketPacketExecute {
  execute(packet: any[], options: IDecoratorSocketPacketOptions, next: Next): Promise<any>;
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
