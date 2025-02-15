import type { IInterceptorRecordLocal } from '../../types/interceptor.js';
import { UseOnionBase } from './useOnionBase.js';

export function UseInterceptor<T extends keyof IInterceptorRecordLocal>(
  interceptorName: T,
  options?: Partial<IInterceptorRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseOnionBase('interceptor', interceptorName, options);
}
