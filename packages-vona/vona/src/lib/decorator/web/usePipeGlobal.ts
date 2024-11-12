import { IPipeRecordGlobal } from '../../../types/interface/pipe.js';
import { TypeUseMiddlewareGlobalLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareGlobalLike } from './useMiddlewareGlobalLike.js';

export function UsePipeGlobal<T extends keyof IPipeRecordGlobal>(
  pipeName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IPipeRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('pipe', pipeName, options);
}
