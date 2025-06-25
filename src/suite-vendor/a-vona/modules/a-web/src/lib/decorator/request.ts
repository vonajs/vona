import type { IOpenApiOptions } from 'vona-module-a-openapiutils';
import type { TypeRequestMethod } from '../../types/request.ts';
import { appMetadata } from 'vona';
import { SymbolOpenApiOptions } from 'vona-module-a-openapiutils';
import { SymbolRequestMappingHandler } from '../../types/request.ts';

export interface RequestMappingMetadata {
  path?: string;
  method?: TypeRequestMethod;
  options?: IOpenApiOptions;
}

const defaultMetadata: RequestMappingMetadata = {
  method: 'get',
  path: '',
  options: undefined,
};

export function RequestMapping(metadata: RequestMappingMetadata = defaultMetadata): MethodDecorator {
  const path = metadata.path || '';
  const method = metadata.method || 'get';
  const options = metadata.options;

  return (target: object, prop: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    appMetadata.defineMetadata(SymbolRequestMappingHandler, { path, method }, target, prop);
    if (options) {
      const optionsMeta = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target, prop) as IOpenApiOptions;
      Object.assign(optionsMeta, options);
    }
    return descriptor;
  };
}

function createMappingDecorator(method: TypeRequestMethod) {
  return (path?: IOpenApiOptions | string, options?: IOpenApiOptions): MethodDecorator => {
    if (path && typeof path === 'object') {
      options = path;
      path = undefined;
    }
    return RequestMapping({ method, path, options });
  };
}

const Post = createMappingDecorator('post');
const Get = createMappingDecorator('get');
const Delete = createMappingDecorator('delete');
const Put = createMappingDecorator('put');
const Patch = createMappingDecorator('patch');
const Options = createMappingDecorator('options');
const Head = createMappingDecorator('head');

export const Web = {
  post: Post,
  get: Get,
  delete: Delete,
  put: Put,
  patch: Patch,
  options: Options,
  head: Head,
};
