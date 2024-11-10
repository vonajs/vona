import { IGuardRecordGlobal } from '../../../types/interface/guard.js';
import { TypeUseMiddlewareGlobalLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareGlobalLike } from './useMiddlewareGlobalLike.js';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: TypeUseMiddlewareGlobalLikeOptions<IGuardRecordGlobal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('guard', guardName, options);
}
