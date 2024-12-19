import { ServiceOnion } from 'vona-module-a-onion';

export interface IDtoRecord {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    dto: ServiceOnion<never, keyof IDtoRecord>;
  }
}

declare module 'vona' {
  export interface IBeanSceneRecord {
    dto: never;
  }
}
