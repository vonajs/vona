import { IPipeRecordLocal } from '../../../types/interface/pipe.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UsePipe<T extends keyof IPipeRecordLocal>(
  pipeName: T,
  options?: Partial<IPipeRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('pipe', pipeName, options);
}
