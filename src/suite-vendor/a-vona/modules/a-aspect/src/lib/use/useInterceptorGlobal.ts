import { TypeUseMiddlewareGlobalLikeOptions, UseMiddlewareGlobalLike } from 'vona';
import { IInterceptorRecordGlobal } from '../../types/interceptor.js';

export function UseInterceptorGlobal<T extends keyof IInterceptorRecordGlobal>(
  interceptorName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IInterceptorRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('interceptor', interceptorName, options);
}
