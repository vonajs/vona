import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IInterceptorRecordGlobal } from '../../types/interceptor.ts';
import { UseOnionGlobalBase } from './useOnionGlobalBase.ts';

export function UseInterceptorGlobal<T extends keyof IInterceptorRecordGlobal>(
  interceptorName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IInterceptorRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('interceptor', interceptorName, options);
}
