import { UseMiddlewareLike } from 'vona';
import { IGuardRecordLocal } from '../../types/guard.js';

export function UseGuard<T extends keyof IGuardRecordLocal>(
  guardName: T,
  options?: Partial<IGuardRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('guard', guardName, options);
}
