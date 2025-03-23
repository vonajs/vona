import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IGuardOptionsAdmin } from '../bean/guard.admin.ts';
import type { IGuardOptionsPassport } from '../bean/guard.passport.ts';
import { Aspect } from 'vona-module-a-aspect';

function Public(
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IGuardOptionsPassport>>,
): ClassDecorator & MethodDecorator {
  const _public = options?.public === undefined ? true : options.public;
  return Aspect.guardGlobal('a-user:passport', { public: _public });
}

function Admin(
  options?: Partial<IGuardOptionsAdmin>,
): ClassDecorator & MethodDecorator {
  return Aspect.guard('a-user:admin', options);
}

export const Passport = {
  admin: Admin,
  public: Public,
};
