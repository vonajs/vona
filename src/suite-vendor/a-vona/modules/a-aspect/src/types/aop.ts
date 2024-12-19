import { IBeanRecord, OmitNever } from 'vona';
import { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion } from 'vona-module-a-onion';

export interface IAopRecord {}

export interface IDecoratorAopOptions
  extends IOnionOptionsEnable,
    IOnionOptionsMatch<keyof IBeanRecord>,
    IOnionOptionsDeps<keyof IAopRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    aop: ServiceOnion<IDecoratorAopOptions, keyof IAopRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    aop: OmitNever<IAopRecord>;
  }

  export interface IBeanSceneRecord {
    aop: never;
  }
}
