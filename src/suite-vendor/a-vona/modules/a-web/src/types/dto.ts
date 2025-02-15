import type { ServiceOnion } from 'vona-module-a-onion';

export interface IDtoRecord {}

export interface IDecoratorDtoOptions {
  description?: string;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    dto: ServiceOnion<IDecoratorDtoOptions, keyof IDtoRecord>;
  }
}

declare module 'vona' {
  export interface IBeanSceneRecord {
    dto: never;
  }
}
