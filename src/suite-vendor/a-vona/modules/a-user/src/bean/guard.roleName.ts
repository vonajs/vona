import type { Next } from 'vona';
import type { IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';
import type { IRoleNameRecord } from '../types/role.ts';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';
import { $getRoleName } from '../lib/role.ts';

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
    if (!user || user.anonymous) return this.app.throw(403);
    const roles = this.bean.passport.getCurrentRoles();
    if (!roles) return this.app.throw(403);
    const roleNames = roles?.map(item => $getRoleName(item) as keyof IRoleNameRecord);
    const optionsName = Array.isArray(options.name) ? options.name : [options.name];
    if (!roleNames.some(roleName => optionsName.includes(roleName))) return this.app.throw(403);
    if (options.passWhenMatched) return true;
    // next
    return next();
  }
}
