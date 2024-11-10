import { IMiddlewareRecordGlobal, TypeUseMiddlewareGlobalOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareGlobalLike } from './useMiddlewareGlobalLike.js';

export function UseMiddlewareGlobal<T extends keyof IMiddlewareRecordGlobal>(
  middlewareName: T,
  options?: TypeUseMiddlewareGlobalOptions<IMiddlewareRecordGlobal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('middleware', middlewareName, options);
}
