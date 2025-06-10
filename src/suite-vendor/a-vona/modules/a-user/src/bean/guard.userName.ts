import type { Next } from 'vona';
import type { IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';
import type { IUserNameRecord } from '../types/user.ts';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';
import { $getUserAnonymous, $getUserName } from '../lib/user.ts';

export interface IGuardOptionsUserName extends IDecoratorGuardOptions {
  name?: keyof IUserNameRecord | (keyof IUserNameRecord)[];
  passWhenMatched: boolean;
}

@Guard<IGuardOptionsUserName>({
  passWhenMatched: true,
})
export class GuardUserName extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsUserName, next: Next): Promise<boolean> {
    if (!options.name) return this.app.throw(403);
    const user = this.bean.passport.getCurrentUser();
    if (!user || $getUserAnonymous(user)) return this.app.throw(403);
    const userName = $getUserName(user) as keyof IUserNameRecord;
    const optionsName = Array.isArray(options.name) ? options.name : [options.name];
    if (!optionsName.includes(userName)) return this.app.throw(403);
    if (options.passWhenMatched) return true;
    // next
    return next();
  }
}
