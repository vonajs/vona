import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IGuardOptionsPassport } from '../bean/guard.passport.ts';
import { Aspect } from 'vona-module-a-aspect';

export function Public(
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IGuardOptionsPassport>>,
): ClassDecorator & MethodDecorator {
  const _public = options?.public === undefined ? true : options.public;
  return Aspect.guardGlobal('a-user:passport', { public: _public });
}
