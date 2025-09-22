import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

export interface ISerializerTransformRecord {}

export interface ISerializerTransform<VALUE = unknown, DATA = unknown, RESULT = VALUE> {
  transform(value: VALUE, data: DATA, options: IDecoratorSerializerTransformOptions): Promise<RESULT>;
}

export type TypeSerializerTransformGetter = (value: any, data: any) => any;

export interface IDecoratorSerializerTransformOptions {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    serializerTransform: ServiceOnion<ISerializerTransformRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    serializerTransform: OmitNever<ISerializerTransformRecord>;
  }

  export interface IBeanSceneRecord {
    serializerTransform: never;
  }
}
