import { ServiceOnion } from 'vona-module-a-onion';

export interface IAtomRecord {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    atom: ServiceOnion<never, keyof IAtomRecord>;
  }
}

declare module 'vona' {
  export interface IBeanSceneRecord {
    atom: never;
  }
}
