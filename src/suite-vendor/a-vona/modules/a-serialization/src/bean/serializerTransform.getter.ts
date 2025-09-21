import type { IDecoratorSerializerTransformOptions, ISerializerTransform, TypeSerializerTransformGetter } from '../types/serializerTransform.ts';
import { BeanBase } from 'vona';
import { SerializerTransform } from '../lib/serializerTransform.ts';

export type TypeSerializerTransformGetterValue = unknown;

export type TypeSerializerTransformGetterData = unknown;

export type TypeSerializerTransformGetterResult = TypeSerializerTransformGetterValue;

export interface ISerializerTransformOptionsGetter extends IDecoratorSerializerTransformOptions {
  getter: TypeSerializerTransformGetter;
}

@SerializerTransform<ISerializerTransformOptionsGetter>()
export class SerializerTransformGetter extends BeanBase
  implements ISerializerTransform<
    TypeSerializerTransformGetterValue,
    TypeSerializerTransformGetterData,
    TypeSerializerTransformGetterResult
  > {
  async transform(
    value: TypeSerializerTransformGetterValue,
    _data: TypeSerializerTransformGetterData,
    _options: ISerializerTransformOptionsGetter,
  ): Promise<TypeSerializerTransformGetterResult> {
    return value;
  }
}
