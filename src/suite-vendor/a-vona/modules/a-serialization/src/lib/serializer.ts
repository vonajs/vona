import type { MetadataKey } from 'vona';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';
import { mergeFieldOpenapiMetadata } from 'vona-module-a-openapi';

export function Exclude(): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = { exclude: true };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

export function Transform(): PropertyDecorator {
  return function (_target: object, _prop: MetadataKey) {
  };
}

export const Serializer = { exclude: Exclude, transform: Transform };
