import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

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

  export interface IBeanSceneRecord {
    meta: never;
  }
}
