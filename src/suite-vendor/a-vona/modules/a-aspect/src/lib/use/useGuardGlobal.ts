import type { MetadataKey } from 'vona';
import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IGuardRecordGlobal } from '../../types/guard.ts';
import { isNil } from '@cabloy/utils';
import { setPublic } from 'vona-module-a-openapi';
import { UseOnionGlobalBase } from './useOnionGlobalBase.ts';

export function UseGuardGlobal<T extends keyof IGuardRecordGlobal>(
  guardName: T,
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IGuardRecordGlobal[T]>>,
  fn?: (target: object, prop?: MetadataKey, descriptor?: PropertyDescriptor) => PropertyDescriptor | undefined,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('guard', guardName, options, (target, prop, descriptor) => {
    if (guardName === 'a-user:passport' && !isNil(options?.public)) {
      setPublic(target, prop!, options?.public);
    }
    if (!fn) return descriptor;
    return fn(target, prop, descriptor);
  });
}
