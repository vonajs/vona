import { Onion } from 'vona';

export interface IAtomRecord {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    atom: Onion<never, keyof IAtomRecord>;
  }
}

declare module 'vona' {
  export interface ISceneCustomRecord {
    atom: never;
  }
}
