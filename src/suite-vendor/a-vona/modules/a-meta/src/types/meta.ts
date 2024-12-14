import { OmitNever, Onion } from 'vona';

export interface IMetaRecord {}

export interface IDecoratorMetaOptions {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    meta: ServiceOnion<IDecoratorMetaOptions, keyof IMetaRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    meta: OmitNever<IMetaRecord>;
  }

  export interface ISceneCustomRecord {
    meta: never;
  }
}
