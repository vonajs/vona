import { appMetadata, MetadataKey } from 'vona';
import { SymbolUseOnionLocal, SymbolUseOnionOptions } from 'vona-module-a-onion';

export function UseOnionBase(sceneName: string, onionName: string, options?: any): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const middlewaresOptions = appMetadata.getOwnMetadataMap(false, SymbolUseOnionOptions, target, prop);
    const middlewaresLocal = appMetadata.getOwnMetadataMap<string, string[]>(false, SymbolUseOnionLocal, target, prop);
    //
    const beanFullName = onionName.replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    if (!middlewaresLocal[sceneName]) middlewaresLocal[sceneName] = [];
    middlewaresLocal[sceneName].push(onionName);
    return descriptor;
  } as any;
}
