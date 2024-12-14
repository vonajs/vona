import { appMetadata, MetadataKey, SymbolUseOnionOptions } from 'vona';

export function UseOnionGlobalBase(sceneName: string, middlewareName, options?): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const middlewaresOptions = appMetadata.getOwnMetadataMap(false, SymbolUseOnionOptions, target, prop);
    const beanFullName = (middlewareName as string).replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    return descriptor;
  } as any;
}
