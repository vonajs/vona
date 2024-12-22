import { appMetadata, MetadataKey } from 'vona';
import { SymbolResponseMetadata, TypeResponseContentType } from '../../types/response.js';

function contentType(contentType: TypeResponseContentType): MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const map = appMetadata.getOwnMetadataMap(false, SymbolResponseMetadata, target, prop);
    map.contentType = contentType;
    return descriptor;
  } as any;
}

export const Res = { contentType };
