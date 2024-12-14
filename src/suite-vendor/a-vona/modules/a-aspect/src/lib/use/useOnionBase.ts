import { appMetadata, MetadataKey } from 'vona';
import { SymbolUseMiddlewareLocal, SymbolUseMiddlewareOptions } from '../../types/middleware.js';

export function UseOnionBase(sceneName: string, middlewareName, options?): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const middlewaresOptions = appMetadata.getOwnMetadataMap(false, SymbolUseMiddlewareOptions, target, prop);
    const middlewaresLocal = appMetadata.getOwnMetadataMap<string, string[]>(
      false,
      SymbolUseMiddlewareLocal,
      target,
      prop,
    );
    //
    const beanFullName = (middlewareName as string).replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    if (!middlewaresLocal[sceneName]) middlewaresLocal[sceneName] = [];
    middlewaresLocal[sceneName].push(middlewareName);
    return descriptor;
  } as any;
}
