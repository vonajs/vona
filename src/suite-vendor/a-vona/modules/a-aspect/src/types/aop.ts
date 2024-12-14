import { OmitNever } from 'vona';
import { IOnionOptionsDeps, IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface IAopRecord {}

export type TypeDecoratorAopOptionsMatch = string | RegExp | (string | RegExp)[];

export interface IDecoratorAopOptions extends IOnionOptionsEnable, IOnionOptionsDeps<keyof IAopRecord> {
  match?: TypeDecoratorAopOptionsMatch;
  ignore?: TypeDecoratorAopOptionsMatch;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    aop: ServiceOnion<IDecoratorAopOptions, keyof IAopRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    aop: OmitNever<IAopRecord>;
  }

  export interface ISceneCustomRecord {
    aop: never;
  }
}
