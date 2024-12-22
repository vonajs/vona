import { appMetadata, MetadataKey } from 'vona';
import { IOpenApiOptions, SymbolOpenApiOptions, TypeResponseContentType } from '../types/api.js';

function contentType(contentType: TypeResponseContentType): MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    options.contentType = contentType;
    return descriptor;
  } as any;
}

export const Api = { contentType };
