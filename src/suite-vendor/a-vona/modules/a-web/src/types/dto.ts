import { Onion } from 'vona';

export interface IDtoRecord {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    dto: Onion<never, keyof IDtoRecord>;
  }
}

declare module 'vona' {
  export interface ISceneCustomRecord {
    dto: never;
  }
}
