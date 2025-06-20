import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IGuardOptionsPassport } from '../bean/guard.passport.ts';
import type { IGuardOptionsRoleName } from '../bean/guard.roleName.ts';
import type { IGuardOptionsUserName } from '../bean/guard.userName.ts';
import { Aspect } from 'vona-module-a-aspect';

function Public(
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IGuardOptionsPassport>>,
): ClassDecorator & MethodDecorator {
  const _public = options?.public === undefined ? true : options.public;
  return Aspect.guardGlobal('a-user:passport', { public: _public });
}

function UserName(
  options?: Partial<IGuardOptionsUserName>,
): ClassDecorator & MethodDecorator {
  return Aspect.guard('a-user:userName', options);
}

function RoleName(
  options?: Partial<IGuardOptionsRoleName>,
): ClassDecorator & MethodDecorator {
  return Aspect.guard('a-user:roleName', options);
}

function Admin(
  options?: Partial<Omit<IGuardOptionsRoleName, 'name'>>,
): ClassDecorator & MethodDecorator {
  return Aspect.guard('a-user:roleName', Object.assign({}, options, { name: 'admin' as const }));
}

export interface IDecoratorGroupPassport {
  public: typeof Public;
  userName: typeof UserName;
  roleName: typeof RoleName;
  admin: typeof Admin;
}

export const Passport: IDecoratorGroupPassport = {
  public: Public,
  userName: UserName,
  roleName: RoleName,
  admin: Admin,
} as unknown as IDecoratorGroupPassport;
