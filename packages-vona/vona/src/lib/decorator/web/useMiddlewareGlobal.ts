import { IMiddlewareRecordGlobal } from '../../../types/interface/middleware.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';

export const SymbolUseMiddlewareOptions = Symbol('SymbolUseMiddlewareOptions');

export function useMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: IMiddlewareRecordGlobal[T],
): ClassDecorator & MethodDecorator {
  return function (target: object, _prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    let middlewaresOptions;
    if (descriptor) {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, descriptor.value);
    } else {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, target);
    }
    middlewaresOptions[middlewareName] = options;
    return descriptor;
  } as any;
}
