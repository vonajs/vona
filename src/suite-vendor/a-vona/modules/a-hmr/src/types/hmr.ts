import type { IDecoratorBeanOptionsBase } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

export interface IHmrRecord {}

export interface IHmrReload {
  reload: (beanOptions: IDecoratorBeanOptionsBase) => Promise<void>;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    hmr: ServiceOnion<IHmrRecord>;
  }
}

declare module 'vona' {

  export interface IBeanSceneRecord {
    hmr: never;
  }
}
