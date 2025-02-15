import type { IPipeRecordLocal } from '../../types/pipe.js';
import { UseOnionBase } from './useOnionBase.js';

export function UsePipe<T extends keyof IPipeRecordLocal>(
  pipeName: T,
  options?: Partial<IPipeRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseOnionBase('pipe', pipeName, options);
}
