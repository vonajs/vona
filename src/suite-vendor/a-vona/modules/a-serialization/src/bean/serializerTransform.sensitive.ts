import type { IDecoratorSerializerTransformOptions, ISerializerTransform } from '../types/serializerTransform.ts';
import { BeanBase } from 'vona';
import { SerializerTransform } from '../lib/serializerTransform.ts';

export type TypeSerializerTransformSensitiveValue = string;

export type TypeSerializerTransformSensitiveData = unknown;

export type TypeSerializerTransformSensitiveResult = TypeSerializerTransformSensitiveValue;

export interface ISerializerTransformOptionsSensitive extends IDecoratorSerializerTransformOptions {
  patternFrom: RegExp;
  patternTo: string;
}

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
    options: ISerializerTransformOptionsSensitive,
  ): Promise<TypeSerializerTransformSensitiveResult> {
    return value.replace(options.patternFrom, options.patternTo);
  }
}
