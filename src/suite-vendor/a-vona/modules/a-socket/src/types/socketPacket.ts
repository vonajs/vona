import { IOnionOptionsBase, IOnionOptionsDeps, Next, OmitNever, Onion } from 'vona';

export interface ISocketPacketRecord {}

export interface ISocketPacketExecute {
  execute(packet: any[], options: IDecoratorSocketPacketOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketPacketOptions
  extends IOnionOptionsBase,
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

  export interface ISceneCustomRecord {
    socketPacket: never;
  }
}
