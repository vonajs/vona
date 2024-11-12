import { IMiddlewareRecordGlobal, TypeUseMiddlewareGlobalLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareGlobalLike } from './useMiddlewareGlobalLike.js';

export function UseMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IMiddlewareRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('middleware', middlewareName, options);
}
