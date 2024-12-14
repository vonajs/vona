import { IGuardRecordGlobal } from '../../types/guard.js';
import { TypeUseMiddlewareGlobalLikeOptions } from '../../types/middleware.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IGuardRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('guard', guardName, options);
}
