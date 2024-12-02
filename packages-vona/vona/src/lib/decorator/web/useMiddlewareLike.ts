import { SymbolUseMiddlewareLocal, SymbolUseMiddlewareOptions } from '../../../types/interface/middleware.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { isUndefined } from '../../utils/utilsShared.js';

export function UseMiddlewareLike(sceneName: string, middlewareName, options?): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    let middlewaresOptions;
    let middlewaresLocal;
    if (!isUndefined(prop)) {
      middlewaresOptions = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareOptions, descriptor!.value);
      middlewaresLocal = appMetadata.getOwnMetadataMap(SymbolUseMiddlewareLocal, target, prop);
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
