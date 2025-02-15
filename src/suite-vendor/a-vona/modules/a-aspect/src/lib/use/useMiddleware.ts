import type { IMiddlewareRecordLocal } from '../../types/middleware.js';
import { UseOnionBase } from './useOnionBase.js';

export function UseMiddleware<T extends keyof IMiddlewareRecordLocal>(
  middlewareName: T,
  options?: Partial<IMiddlewareRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseOnionBase('middleware', middlewareName, options);
}
