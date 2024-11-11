import { IInterceptorRecordLocal } from '../../../types/interface/interceptor.js';
import { TypeUseMiddlewareLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseInterceptor<T extends keyof IInterceptorRecordLocal>(
  guardName: T,
  options?: TypeUseMiddlewareLikeOptions<IInterceptorRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('interceptor', guardName, options);
}
