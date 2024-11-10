import { SymbolUseMiddlewareOptions } from '../../../types/interface/middleware.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';

export function UseMiddlewareGlobalLike(sceneName: string, middlewareName, options?): ClassDecorator & MethodDecorator {
  return function (target: object, _prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    let middlewaresOptions;
    if (descriptor) {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, descriptor.value);
    } else {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, target);
    }
    const beanFullName = (middlewareName as string).replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    return descriptor;
  } as any;
}
