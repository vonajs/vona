import { UseMiddlewareLike } from 'vona';
import { IPipeRecordLocal } from '../types/pipe.js';

export function UsePipe<T extends keyof IPipeRecordLocal>(
  pipeName: T,
  options?: Partial<IPipeRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('pipe', pipeName, options);
}
