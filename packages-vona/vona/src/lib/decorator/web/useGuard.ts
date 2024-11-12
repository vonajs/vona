import { IGuardRecordLocal } from '../../../types/interface/guard.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseGuard<T extends keyof IGuardRecordLocal>(
  guardName: T,
  options?: Partial<IGuardRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('guard', guardName, options);
}
