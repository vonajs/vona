import { IMiddlewareRecordLocal } from '../../../types/interface/middleware.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseMiddleware<T extends keyof IMiddlewareRecordLocal>(
  middlewareName: T,
  options?: IMiddlewareRecordLocal[T],
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('middleware', middlewareName, options);
}
