import { IInterceptorRecordLocal } from '../../../types/interface/interceptor.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseInterceptor<T extends keyof IInterceptorRecordLocal>(
  interceptorName: T,
  options?: Partial<IInterceptorRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('interceptor', interceptorName, options);
}
