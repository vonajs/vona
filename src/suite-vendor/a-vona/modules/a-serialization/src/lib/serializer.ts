import type { MetadataKey } from 'vona';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';
import type { ISerializerTransformRecord, TypeSerializerTransformGetter } from '../types/serializerTransform.ts';
import { mergeFieldOpenapiMetadata } from 'vona-module-a-openapi';

function Exclude(): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = { exclude: true };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

function Transform<T extends keyof ISerializerTransformRecord>(
  serializerTransformName: T,
  options?: Partial<ISerializerTransformRecord[T]>,
): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        [serializerTransformName]: options,
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

function Sensitive(
  options: ISerializerTransformRecord['a-serialization:sensitive'],
): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        'a-serialization:sensitive': options,
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

function Getter(getter: TypeSerializerTransformGetter): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        'a-serialization:getter': { getter },
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

export const Serializer = { exclude: Exclude, transform: Transform, sensitive: Sensitive, getter: Getter };
