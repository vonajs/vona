import { IMiddlewareRecordLocal, TypeUseMiddlewareLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseMiddleware<T extends keyof IMiddlewareRecordLocal>(
  middlewareName: T,
  options?: TypeUseMiddlewareLikeOptions<IMiddlewareRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('middleware', middlewareName, options);
}
