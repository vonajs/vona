import { IOnionOptionsEnable, OmitNever, Onion } from 'vona';

export interface IControllerRecord {}

export interface IDecoratorControllerOptions extends IOnionOptionsEnable {
  path?: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    controller: Onion<IDecoratorControllerOptions, keyof IControllerRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    controller: OmitNever<IControllerRecord>;
  }

  export interface ISceneCustomRecord {
    controller: never;
  }
}
