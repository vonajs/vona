import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import type WebSocket from 'ws';

export interface ISocketPathRecord {}

export interface ISocketConnectionRecord {}

export interface ISocketConnectionExecute {
  enter: (ws: WebSocket, options: IDecoratorSocketConnectionOptions, next: Next) => Promise<any>;
  exit: (ws: WebSocket, options: IDecoratorSocketConnectionOptions, next: Next) => Promise<any>;
}

export interface IDecoratorSocketConnectionOptions
  extends IOnionOptionsBase<keyof ISocketPathRecord>,
  IOnionOptionsDeps<keyof ISocketConnectionRecord> {}

export interface ISocketConnectionComposeData {
  method: 'enter' | 'exit';
  ws: WebSocket;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    socketConnection: ServiceOnion<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    socketConnection: OmitNever<ISocketConnectionRecord>;
  }

  export interface IBeanSceneRecord {
    socketConnection: never;
  }
}
