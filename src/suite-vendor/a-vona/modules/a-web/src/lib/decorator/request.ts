import { appMetadata } from 'vona';
import { RequestMethod, SymbolRequestMappingHandler } from '../../types/request.js';

export interface RequestMappingMetadata {
  path?: RegExp | string;
  method?: RequestMethod;
}

const defaultMetadata = {
  path: '',
  method: RequestMethod.GET,
};

export const RequestMapping = (metadata: RequestMappingMetadata = defaultMetadata): MethodDecorator => {
  const path = metadata.path || '';
  const method = metadata.method || RequestMethod.GET;

  return (target: object, prop: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    appMetadata.defineMetadata(SymbolRequestMappingHandler, { path, method }, target, prop);
    return descriptor;
  };
};

const createMappingDecorator =
  (method: RequestMethod) =>
  (path?: RegExp | string): MethodDecorator => {
    return RequestMapping({ path, method });
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
