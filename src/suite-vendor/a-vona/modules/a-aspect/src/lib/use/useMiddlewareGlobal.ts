import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IMiddlewareRecordGlobal } from '../../types/middleware.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IMiddlewareRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('middleware', middlewareName, options);
}
