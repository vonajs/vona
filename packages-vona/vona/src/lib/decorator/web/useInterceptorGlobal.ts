import { IInterceptorRecordGlobal } from '../../../types/interface/interceptor.js';
import { TypeUseMiddlewareGlobalLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareGlobalLike } from './useMiddlewareGlobalLike.js';

export function UseInterceptorGlobal<T extends keyof IInterceptorRecordGlobal>(
  interceptorName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IInterceptorRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('interceptor', interceptorName, options);
}
