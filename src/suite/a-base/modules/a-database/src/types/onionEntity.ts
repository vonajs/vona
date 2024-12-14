import { OmitNever, Onion } from 'vona';

export interface IEntityRecord {}

export interface IDecoratorEntityOptions {
  table?: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    entity: ServiceOnion<IDecoratorEntityOptions, keyof IEntityRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    entity: OmitNever<IEntityRecord>;
  }

  export interface ISceneCustomRecord {
    entity: never;
  }
}
