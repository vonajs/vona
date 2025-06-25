import type { MetadataKey } from 'vona';
import type { IOpenApiOptions } from '../../types/api.ts';
import { appMetadata } from 'vona';
import { SymbolOpenApiOptions } from '../../types/api.ts';

export function setPublic(target: object, prop?: MetadataKey, _descriptor?: PropertyDescriptor, value?: boolean) {
  const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
  options.public = value;
}
