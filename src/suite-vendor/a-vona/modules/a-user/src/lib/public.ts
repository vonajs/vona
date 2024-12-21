import { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import { IGuardOptionsPassport } from '../bean/guard.passport.js';
import { UseGuardGlobal } from 'vona-module-a-aspect';

export function Public(
  options?: Partial<TypeUseOnionGlobalBaseOptions<IGuardOptionsPassport>>,
): ClassDecorator & MethodDecorator {
  return UseGuardGlobal('a-user:passport', options);
}
