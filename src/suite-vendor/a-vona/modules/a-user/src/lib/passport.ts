import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IGuardOptionsAdmin } from '../bean/guard.admin.ts';
import type { IGuardOptionsPassport } from '../bean/guard.passport.ts';
import type { IGuardOptionsUserName } from '../bean/guard.userName.ts';
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

function UserName(
  options?: Partial<IGuardOptionsUserName>,
): ClassDecorator & MethodDecorator {
  return Aspect.guard('a-user:userName', options);
}

export interface IDecoratorGroupPassport {
  admin: typeof Admin;
  public: typeof Public;
  userName: typeof UserName;
}

export const Passport: IDecoratorGroupPassport = {
  admin: Admin,
  public: Public,
  userName: UserName,
} as unknown as IDecoratorGroupPassport;
