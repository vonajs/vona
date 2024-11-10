import { IGuardRecordLocal } from '../../../types/interface/guard.js';
import { TypeUseMiddlewareLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseGuard<T extends keyof IGuardRecordLocal>(
  guardName: T,
  options?: TypeUseMiddlewareLikeOptions<IGuardRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('guard', guardName, options);
}
