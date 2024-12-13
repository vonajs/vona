import { Onion } from 'vona';

export interface IServiceRecord {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    service: Onion<never, keyof IServiceRecord>;
  }
}

declare module 'vona' {
  export interface ISceneCustomRecord {
    service: never;
  }
}
