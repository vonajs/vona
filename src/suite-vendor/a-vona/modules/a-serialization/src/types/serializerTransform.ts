import type { OmitNever, VonaContext } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

export interface ISerializerTransformRecord {}

export interface ISerializerTransform<VALUE = unknown, DATA = unknown, RESULT = VALUE> {
  transform(value: VALUE, data: DATA, options: IDecoratorSerializerTransformOptions<VALUE, DATA>): Promise<RESULT>;
}

export type TypeSerializerTransformGetter = (this: VonaContext, data: any, value: any) => any;
export type TypeSerializerTransformFilter<VALUE, DATA> =
  (this: VonaContext, value: VALUE, data: DATA, options: IDecoratorSerializerTransformOptions<VALUE, DATA>) => Promise<boolean>;

export interface IDecoratorSerializerTransformOptions<VALUE, DATA> {
  filter?: TypeSerializerTransformFilter<VALUE, DATA>;
}

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
