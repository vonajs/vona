import { TypeUseMiddlewareGlobalLikeOptions, UseMiddlewareGlobalLike } from 'vona';
import { IGuardRecordGlobal } from '../../types/guard.js';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IGuardRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('guard', guardName, options);
}
