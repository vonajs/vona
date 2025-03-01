import type { MetadataKey } from 'vona';
import type { IAopMethodRecord } from '../../types/aopMethod.ts';
import { appMetadata, registerMappedClassMetadataKey } from 'vona';

export const SymbolDecoratorUseAopMethod = Symbol('SymbolDecoratorUseAopMethod');
export interface IUseAopMethodPropMetadata<T extends keyof IAopMethodRecord> {
  aopMethodName: T;
  options?: Partial<IAopMethodRecord[T]>;
}

export function UseAopMethod<T extends keyof IAopMethodRecord>(
  aopMethodName: T,
  options?: Partial<IAopMethodRecord[T]>,
): PropertyDescriptor & MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor?: PropertyDescriptor) {
    registerMappedClassMetadataKey(target, SymbolDecoratorUseAopMethod);
    const uses = appMetadata.getOwnMetadataMap<MetadataKey, IUseAopMethodPropMetadata<T>[]>(
      true,
      SymbolDecoratorUseAopMethod,
      target,
    );
    if (!uses[prop]) uses[prop] = [];
    uses[prop].push({ aopMethodName, options });
    return descriptor;
  } as any;
}
