import { IMiddlewareRecordGlobal } from '../../../types/interface/middleware.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';

export const SymbolUseMiddlewareGlobal = Symbol('SymbolUseMiddlewareGlobal');

export function useMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: IMiddlewareRecordGlobal[T],
): MethodDecorator {
  return function (_target: object, _prop: MetadataKey, descriptor: PropertyDescriptor) {
    const middlewares = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareGlobal, descriptor.value);
    middlewares[middlewareName] = options;
  };
}
