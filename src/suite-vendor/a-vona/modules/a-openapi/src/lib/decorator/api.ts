import { appMetadata, MetadataKey } from 'vona';
import { IOpenApiOptions, SymbolOpenApiOptions, TypeResponseContentType } from '../../types/api.js';
import { SchemaLike } from '../../types/decorator.js';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.js';

function contentType(contentType: TypeResponseContentType): MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    options.contentType = contentType;
    return descriptor;
  } as any;
}

function body(...schemaLikes: SchemaLike[]): MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    // schema
    const metaType = appMetadata.getDesignReturntype(target, prop);
    const schema = makeSchemaLikes(schemaLikes, metaType);
    // options
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    options.bodySchema = schema;
    return descriptor;
  } as any;
}

export const Api = { contentType, body };
