import type { MetadataKey } from 'vona';
import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IGuardRecordGlobal } from '../../types/guard.ts';
import { UseOnionGlobalBase } from './useOnionGlobalBase.ts';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IGuardRecordGlobal[T]>>,
  fn?: (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) => PropertyDescriptor | undefined,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('guard', guardName, options, fn);
}
