import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IPipeRecordGlobal } from '../../types/pipe.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UsePipeGlobal<T extends keyof IPipeRecordGlobal>(
  pipeName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IPipeRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('pipe', pipeName, options);
}
