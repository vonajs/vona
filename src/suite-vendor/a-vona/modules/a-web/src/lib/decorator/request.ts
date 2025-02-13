import { appMetadata } from 'vona';
import { RequestMethod, SymbolRequestMappingHandler } from '../../types/request.js';
import { type IOpenApiOptions, SymbolOpenApiOptions } from 'vona-module-a-openapi';

export interface RequestMappingMetadata {
  path?: RegExp | string;
  method?: RequestMethod;
  options?: IOpenApiOptions;
}

const defaultMetadata = {
  method: RequestMethod.GET,
  path: '',
  options: undefined,
};

export const RequestMapping = (metadata: RequestMappingMetadata = defaultMetadata): MethodDecorator => {
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
};

const createMappingDecorator =
  (method: RequestMethod) =>
  (path?: RegExp | string, options?: IOpenApiOptions): MethodDecorator => {
    return RequestMapping({ method, path, options });
  };

/**
 * Route handler (method) Decorator. Routes HTTP POST requests to the specified path.
 */
export const Post = createMappingDecorator(RequestMethod.POST);

/**
 * Route handler (method) Decorator. Routes HTTP GET requests to the specified path.
 */
export const Get = createMappingDecorator(RequestMethod.GET);

/**
 * Route handler (method) Decorator. Routes HTTP DELETE requests to the specified path.
 */
export const Delete = createMappingDecorator(RequestMethod.DELETE);

/**
 * Route handler (method) Decorator. Routes HTTP PUT requests to the specified path.
 */
export const Put = createMappingDecorator(RequestMethod.PUT);

/**
 * Route handler (method) Decorator. Routes HTTP PATCH requests to the specified path.
 */
export const Patch = createMappingDecorator(RequestMethod.PATCH);

/**
 * Route handler (method) Decorator. Routes HTTP OPTIONS requests to the specified path.
 */
export const Options = createMappingDecorator(RequestMethod.OPTIONS);

/**
 * Route handler (method) Decorator. Routes HTTP HEAD requests to the specified path.
 */
export const Head = createMappingDecorator(RequestMethod.HEAD);
