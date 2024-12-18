import { OmitNever } from 'vona';
import { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface IApiPathRecord
  extends IApiPathGetRecord,
    IApiPathPostRecord,
    IApiPathDeleteRecord,
    IApiPathPutRecord,
    IApiPathPatchRecord {}

export interface IApiPathGetRecord {}
export interface IApiPathPostRecord {}
export interface IApiPathDeleteRecord {}
export interface IApiPathPutRecord {}
export interface IApiPathPatchRecord {}

export interface IControllerRecord {}

export interface IDecoratorControllerOptions extends IOnionOptionsEnable {
  path?: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    controller: ServiceOnion<IDecoratorControllerOptions, keyof IControllerRecord>;
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
