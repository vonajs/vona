import { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import { IGuardOptionsPassport } from '../bean/guard.passport.js';
import { UseGuardGlobal } from 'vona-module-a-aspect';

export function Public(
  options?: Partial<TypeUseOnionGlobalBaseOptions<IGuardOptionsPassport>>,
): ClassDecorator & MethodDecorator {
  const _public = options?.public === undefined ? true : options.public;
  return UseGuardGlobal('a-user:passport', { public: _public });
}
