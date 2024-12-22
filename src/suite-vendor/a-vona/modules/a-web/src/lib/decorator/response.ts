import { appMetadata, MetadataKey } from 'vona';
import { SymbolResponseMetadata } from '../../types/response.js';

function contentType(contentType: string): MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const map = appMetadata.getOwnMetadataMap(false, SymbolResponseMetadata, target, prop);
    map.contentType = contentType;
    return descriptor;
  } as any;
}

export const Response = { contentType };
