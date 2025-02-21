import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IGuardRecordGlobal } from '../../types/guard.ts';
import { UseOnionGlobalBase } from './useOnionGlobalBase.ts';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IGuardRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('guard', guardName, options);
}
