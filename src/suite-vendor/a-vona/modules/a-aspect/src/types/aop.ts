import type { IBeanRecord, OmitNever } from 'vona';
import type { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion, TypeOnionOptionsMatchRule } from 'vona-module-a-onion';

export interface IAopRecord {}

export interface IDecoratorAopOptions
  extends IOnionOptionsEnable,
  IOnionOptionsMatch<TypeOnionOptionsMatchRule<keyof IBeanRecord>>,
  IOnionOptionsDeps<keyof IAopRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    aop: ServiceOnion<IAopRecord>;
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
