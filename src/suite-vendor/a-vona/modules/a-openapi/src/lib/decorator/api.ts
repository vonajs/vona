import type { MetadataKey } from 'vona';
import type { IOpenApiHeader, IOpenApiOptions, TypeResponseContentType } from '../../types/api.ts';
import type { SchemaLike, SchemaLikeCreate } from '../../types/decorator.ts';
import { appMetadata } from 'vona';
import { SymbolOpenApiOptions } from '../../types/api.ts';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.ts';
import { Field } from './field.ts';

export function setPublic(target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor, value?: boolean) {
  const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
  options.public = value;
  if (options.public) {
    const fun = header({ name: 'Authorization' });
    fun(target, prop!, descriptor!);
  }
}

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

function bodyCustom(bodySchemaWrapper: SchemaLikeCreate | false, ...schemaLikes: SchemaLike[]): MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    // schema
    const metaType = appMetadata.getDesignReturntype(target, prop);
    const schema = makeSchemaLikes(schemaLikes, metaType);
    // options
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    options.bodySchema = schema;
    options.bodySchemaWrapper = bodySchemaWrapper;
    return descriptor;
  } as any;
}

function exclude(): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    options.exclude = true;
    return descriptor;
  } as any;
}

function tags(tags: string[]): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    options.tags = tags;
    return descriptor;
  } as any;
}

function header(header: IOpenApiHeader): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    if (!options.headers) options.headers = [];
    options.headers.push(header);
    return descriptor;
  } as any;
}

function headers(headers: IOpenApiHeader[]): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
    if (!options.headers) options.headers = [];
    options.headers.push(...headers);
    return descriptor;
  } as any;
}

export const Api = { field: Field, contentType, body, bodyCustom, exclude, tags, header, headers };
