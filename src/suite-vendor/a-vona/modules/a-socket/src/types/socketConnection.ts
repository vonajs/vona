import { IOnionOptionsBase, IOnionOptionsDeps, Next, OmitNever, Onion } from 'vona';

export interface ISocketConnectionRecord {}

export interface ISocketConnectionExecute {
  execute(options: IDecoratorSocketConnectionOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketConnectionOptions
  extends IOnionOptionsBase,
    IOnionOptionsDeps<keyof ISocketConnectionRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    socketConnection: Onion<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    socketConnection: OmitNever<ISocketConnectionRecord>;
  }

  export interface ISceneCustomRecord {
    socketConnection: never;
  }
}
