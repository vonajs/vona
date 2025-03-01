import type { IAopMethodRecord } from '../../types/aopMethod.ts';
import { UseOnionBase } from './useOnionBase.ts';

export function UseAopMethod<T extends keyof IAopMethodRecord>(
  aopMethodName: T,
  options?: Partial<IAopMethodRecord[T]>,
): PropertyDescriptor & MethodDecorator {
  return UseOnionBase('aopMethod', aopMethodName, options);
}
