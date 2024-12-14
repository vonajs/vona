import { TypeUseMiddlewareGlobalLikeOptions, UseMiddlewareGlobalLike } from 'vona';
import { IPipeRecordGlobal } from '../../types/pipe.js';

export function UsePipeGlobal<T extends keyof IPipeRecordGlobal>(
  pipeName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IPipeRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('pipe', pipeName, options);
}
