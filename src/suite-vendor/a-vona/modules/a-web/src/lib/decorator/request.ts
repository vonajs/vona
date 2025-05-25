import type { IOpenApiOptions } from 'vona-module-a-openapi';
import { appMetadata } from 'vona';
import { SymbolOpenApiOptions } from 'vona-module-a-openapi';
import { RequestMethod, SymbolRequestMappingHandler } from '../../types/request.ts';

export interface RequestMappingMetadata {
  path?: string;
  method?: RequestMethod;
  options?: IOpenApiOptions;
}

const defaultMetadata = {
  method: RequestMethod.GET,
  path: '',
  options: undefined,
};

export function RequestMapping(metadata: RequestMappingMetadata = defaultMetadata): MethodDecorator {
  const path = metadata.path || '';
  const method = metadata.method || RequestMethod.GET;
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

function createMappingDecorator(method: RequestMethod) {
  return (path?: IOpenApiOptions | string, options?: IOpenApiOptions): MethodDecorator => {
    if (path && typeof path === 'object') {
      options = path;
      path = undefined;
    }
    return RequestMapping({ method, path, options });
  };
}

const Post = createMappingDecorator(RequestMethod.POST);
const Get = createMappingDecorator(RequestMethod.GET);
const Delete = createMappingDecorator(RequestMethod.DELETE);
const Put = createMappingDecorator(RequestMethod.PUT);
const Patch = createMappingDecorator(RequestMethod.PATCH);
const Options = createMappingDecorator(RequestMethod.OPTIONS);
const Head = createMappingDecorator(RequestMethod.HEAD);

export const Web = {
  post: Post,
  get: Get,
  delete: Delete,
  put: Put,
  patch: Patch,
  options: Options,
  head: Head,
};
