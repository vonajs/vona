import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';

export interface ISocketPathRecord {}

export interface ISocketConnectionRecord {}

export interface ISocketConnectionExecute {
  execute(options: IDecoratorSocketConnectionOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketConnectionOptions
  extends IOnionOptionsBase<keyof ISocketPathRecord>,
  IOnionOptionsDeps<keyof ISocketConnectionRecord> {}

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
