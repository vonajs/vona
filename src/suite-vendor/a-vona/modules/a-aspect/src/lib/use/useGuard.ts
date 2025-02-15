import type { IGuardRecordLocal } from '../../types/guard.js';
import { UseOnionBase } from './useOnionBase.js';

export function UseGuard<T extends keyof IGuardRecordLocal>(
  guardName: T,
  options?: Partial<IGuardRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseOnionBase('guard', guardName, options);
}
