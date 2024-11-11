import { IInterceptorRecordGlobal } from '../../../types/interface/interceptor.js';
import { TypeUseMiddlewareGlobalLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareGlobalLike } from './useMiddlewareGlobalLike.js';

export function UseInterceptorGlobal<T extends keyof IInterceptorRecordGlobal>(
  guardName: T,
  options?: TypeUseMiddlewareGlobalLikeOptions<IInterceptorRecordGlobal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('interceptor', guardName, options);
}
