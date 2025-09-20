import type { IDecoratorSerializerTransformOptions, ISerializerTransform } from 'vona-module-a-serialization';
import { BeanBase } from 'vona';
import { SerializerTransform } from 'vona-module-a-serialization';

export type TypeSerializerTransformMobileValue = unknown;

export type TypeSerializerTransformMobileData = unknown;

export type TypeSerializerTransformMobileResult = TypeSerializerTransformMobileValue;

export interface ISerializerTransformOptionsMobile extends IDecoratorSerializerTransformOptions {}

@SerializerTransform<ISerializerTransformOptionsMobile>()
export class SerializerTransformMobile extends BeanBase
  implements ISerializerTransform<TypeSerializerTransformMobileValue, TypeSerializerTransformMobileData, TypeSerializerTransformMobileResult> {
  async transform(
    value: TypeSerializerTransformMobileValue,
    _data: TypeSerializerTransformMobileData,
    _options: ISerializerTransformOptionsMobile,
  ): Promise<TypeSerializerTransformMobileResult> {
    return value;
  }
}
