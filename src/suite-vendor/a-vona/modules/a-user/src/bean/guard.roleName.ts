import type { Next } from 'vona';
import type { IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';
import type { IRoleNameRecord } from '../types/role.ts';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';
import { $getUserAnonymous } from '../lib/user.ts';

export interface IGuardOptionsRoleName extends IDecoratorGuardOptions {
  name?: keyof IRoleNameRecord | (keyof IRoleNameRecord)[];
  passWhenMatched: boolean;
}

@Guard<IGuardOptionsRoleName>({
  passWhenMatched: true,
})
export class GuardRoleName extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsRoleName, next: Next): Promise<boolean> {
    if (!options.name) return this.app.throw(403);
    const user = this.bean.passport.getCurrentUser();
    if (!user || $getUserAnonymous(user)) return this.app.throw(403);
    const roles = this.bean.passport.getCurrentRoles();
    const userName = $getUserName(user) as keyof IUserNameRecord;
    const optionsName = Array.isArray(options.name) ? options.name : [options.name];
    if (!optionsName.includes(userName)) return this.app.throw(403);
    if (options.passWhenMatched) return true;
    // next
    return next();
  }
}
