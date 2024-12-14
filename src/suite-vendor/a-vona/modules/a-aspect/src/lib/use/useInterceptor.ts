import { UseMiddlewareLike } from 'vona';
import { IInterceptorRecordLocal } from '../../types/interceptor.js';

export function UseInterceptor<T extends keyof IInterceptorRecordLocal>(
  interceptorName: T,
  options?: Partial<IInterceptorRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('interceptor', interceptorName, options);
}
