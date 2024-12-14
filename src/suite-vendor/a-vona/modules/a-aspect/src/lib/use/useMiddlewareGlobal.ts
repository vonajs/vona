import { IMiddlewareRecordGlobal, TypeUseMiddlewareGlobalLikeOptions } from '../../types/middleware.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IMiddlewareRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('middleware', middlewareName, options);
}
