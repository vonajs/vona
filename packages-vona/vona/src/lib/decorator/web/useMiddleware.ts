import { IMiddlewareRecordLocal } from '../../../types/interface/middleware.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { SymbolUseMiddlewareOptions } from './useMiddlewareGlobal.js';

export const SymboleMiddlewareStatus = Symbol('SymboleMiddlewareStatus');

export const SymbolUseMiddlewareLocal = Symbol('SymbolUseMiddlewareLocal');
export type TypeUseMiddlewareOptions<T> = Omit<
  T,
  'enable' | 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'
>;

export function UseMiddleware<T extends keyof IMiddlewareRecordLocal>(
  middlewareName: T,
  options?: TypeUseMiddlewareOptions<IMiddlewareRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return function (target: object, _prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    let middlewaresOptions;
    let middlewaresLocal;
    if (descriptor) {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, descriptor.value);
      middlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, descriptor.value);
    } else {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, target);
      middlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, target);
    }
    const beanFullName = (middlewareName as string).replace(':', '.middleware.');
    middlewaresOptions[beanFullName] = options;
    if (!middlewaresLocal['middleware']) middlewaresLocal['middleware'] = [];
    middlewaresLocal['middleware'].push(middlewareName);
    return descriptor;
  } as any;
}
