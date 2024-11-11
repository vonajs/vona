import { IPipeRecordLocal } from '../../../types/interface/pipe.js';
import { TypeUseMiddlewareLikeOptions } from '../../../types/interface/middleware.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UsePipe<T extends keyof IPipeRecordLocal>(
  pipeName: T,
  options?: TypeUseMiddlewareLikeOptions<IPipeRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('pipe', pipeName, options);
}
