import { ServiceOnion } from 'vona-module-a-onion';

export interface IServiceRecord {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    service: ServiceOnion<never, keyof IServiceRecord>;
  }
}

declare module 'vona' {
  export interface IBeanSceneRecord {
    service: never;
  }
}
