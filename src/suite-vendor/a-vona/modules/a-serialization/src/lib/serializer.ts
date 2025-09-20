import type { MetadataKey } from 'vona';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';
import type { ISerializerTransformRecord } from '../types/serializerTransform.ts';
import { mergeFieldOpenapiMetadata } from 'vona-module-a-openapi';

export function Exclude(): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = { exclude: true };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

export function Transform<T extends keyof ISerializerTransformRecord>(
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

export const Serializer = { exclude: Exclude, transform: Transform };
