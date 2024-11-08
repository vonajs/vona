import { METHOD_METADATA, PATH_METADATA } from '../../constants.js';
import { RequestMethod } from '../../enum/requestMethod.js';

export interface RequestMappingMetadata {
  path?: RegExp | string;
  method?: RequestMethod;
}

const defaultMetadata = {
  [PATH_METADATA]: '',
  [METHOD_METADATA]: RequestMethod.GET,
};

export const RequestMapping = (metadata: RequestMappingMetadata = defaultMetadata): MethodDecorator => {
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata || '';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;

  return (_target: object, _key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createMappingDecorator =
  (method: RequestMethod) =>
  (path?: RegExp | string): MethodDecorator => {
    return RequestMapping({
      [PATH_METADATA]: path,
      [METHOD_METADATA]: method,
    });
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
