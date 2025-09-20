import { BeanBase } from 'vona';

export type TypeSerializerTransformSensitiveValue = unknown;

export type TypeSerializerTransformSensitiveData = unknown;

export type TypeSerializerTransformSensitiveResult = TypeSerializerTransformSensitiveValue;

export interface ISerializerTransformOptionsSensitive extends IDecoratorSerializerTransformOptions {}

@SerializerTransform<ISerializerTransformOptionsSensitive>()
export class SerializerTransformSensitive extends BeanBase
  implements ISerializerTransform<
    TypeSerializerTransformSensitiveValue,
    TypeSerializerTransformSensitiveData,
    TypeSerializerTransformSensitiveResult
  > {
  async transform(
    value: TypeSerializerTransformSensitiveValue,
    _data: TypeSerializerTransformSensitiveData,
    _options: ISerializerTransformOptionsSensitive,
  ): Promise<TypeSerializerTransformSensitiveResult> {
    return value;
  }
}
