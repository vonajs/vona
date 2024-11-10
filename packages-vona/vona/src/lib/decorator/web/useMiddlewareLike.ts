import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { SymbolUseMiddlewareOptions } from './useMiddlewareGlobal.js';

export type TypeUseMiddlewareOptions<T> = Omit<
  T,
  'enable' | 'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'
>;

export function UseMiddlewareLike(sceneName: string, middlewareName, options?): ClassDecorator & MethodDecorator {
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
    const beanFullName = (middlewareName as string).replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    if (!middlewaresLocal[sceneName]) middlewaresLocal[sceneName] = [];
    middlewaresLocal[sceneName].push(middlewareName);
    return descriptor;
  } as any;
}
