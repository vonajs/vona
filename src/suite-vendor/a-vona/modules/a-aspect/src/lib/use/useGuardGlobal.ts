import { TypeUseOnionGlobalBaseOptions } from 'vona';
import { IGuardRecordGlobal } from '../../types/guard.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IGuardRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('guard', guardName, options);
}
