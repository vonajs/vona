import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

export interface IFilterTransformRecord {}

export interface IFilterTransformWhere<VALUE = unknown, DATA = unknown, RESULT = VALUE> {
  where(value: VALUE, data: DATA, options: IDecoratorFilterTransformOptions): Promise<RESULT>;
}

export interface IDecoratorFilterTransformOptions {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    filterTransform: ServiceOnion<IFilterTransformRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    filterTransform: OmitNever<IFilterTransformRecord>;
  }

  export interface IBeanSceneRecord {
    filterTransform: never;
  }
}
