import { appMetadata, MetadataKey, SymbolUseOnionLocal, SymbolUseOnionOptions } from 'vona';

export function UseOnionBase(sceneName: string, middlewareName, options?): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const middlewaresOptions = appMetadata.getOwnMetadataMap(false, SymbolUseOnionOptions, target, prop);
    const middlewaresLocal = appMetadata.getOwnMetadataMap<string, string[]>(false, SymbolUseOnionLocal, target, prop);
    //
    const beanFullName = (middlewareName as string).replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    if (!middlewaresLocal[sceneName]) middlewaresLocal[sceneName] = [];
    middlewaresLocal[sceneName].push(middlewareName);
    return descriptor;
  } as any;
}
