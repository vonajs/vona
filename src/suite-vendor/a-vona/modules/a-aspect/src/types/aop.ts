import { IOnionOptionsDeps, IOnionOptionsEnable, OmitNever, Onion } from 'vona';

export interface IAopRecord {}

export type TypeDecoratorAopOptionsMatch = string | RegExp | (string | RegExp)[];

export interface IDecoratorAopOptions extends IOnionOptionsEnable, IOnionOptionsDeps<keyof IAopRecord> {
  match?: TypeDecoratorAopOptionsMatch;
  ignore?: TypeDecoratorAopOptionsMatch;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    aop: Onion<IDecoratorAopOptions, keyof IAopRecord>;
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
