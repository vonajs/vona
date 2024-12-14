import { IInterceptorRecordGlobal } from '../../types/interceptor.js';
import { TypeUseOnionGlobalBaseOptions } from '../../types/middleware.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseInterceptorGlobal<T extends keyof IInterceptorRecordGlobal>(
  interceptorName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IInterceptorRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('interceptor', interceptorName, options);
}
