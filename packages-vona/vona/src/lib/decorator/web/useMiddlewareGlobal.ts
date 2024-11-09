import { IMiddlewareRecordGlobal } from '../../../types/interface/middleware.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';

export const SymbolUseMiddlewareOptions = Symbol('SymbolUseMiddlewareOptions');

export function useMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: IMiddlewareRecordGlobal[T],
): ClassDecorator & MethodDecorator {
  return function (target: object, _prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    let middlewares;
    if (descriptor) {
      middlewares = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, descriptor.value);
    } else {
      middlewares = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, target);
    }
    middlewares[middlewareName] = options;
    return descriptor;
  } as any;
}
