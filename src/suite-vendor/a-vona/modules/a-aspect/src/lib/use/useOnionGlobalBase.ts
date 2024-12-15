import { appMetadata, MetadataKey } from 'vona';
import { SymbolUseOnionOptions } from 'vona-module-a-onion';

export function UseOnionGlobalBase(
  sceneName: string,
  onionName: string,
  options?: any,
): ClassDecorator & MethodDecorator {
  return function (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) {
    const middlewaresOptions = appMetadata.getOwnMetadataMap(false, SymbolUseOnionOptions, target, prop);
    const beanFullName = onionName.replace(':', `.${sceneName}.`);
    middlewaresOptions[beanFullName] = options;
    return descriptor;
  } as any;
}
