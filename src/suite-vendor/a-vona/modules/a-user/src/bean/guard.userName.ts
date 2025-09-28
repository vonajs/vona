import type { Next } from 'vona';
import type { IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';
import type { IUserNameRecord } from '../types/user.ts';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsUserName extends IDecoratorGuardOptions {
  name?: keyof IUserNameRecord | (keyof IUserNameRecord)[];
  passWhenMatched: boolean;
  rejectWhenDismatched: boolean;
}

@Guard<IGuardOptionsUserName>({
  passWhenMatched: true,
  rejectWhenDismatched: true,
})
export class GuardUserName extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsUserName, next: Next): Promise<boolean> {
    const result = await this._check(options);
    if (!result) {
      if (options.rejectWhenDismatched) return this.app.throw(403);
    } else {
      if (options.passWhenMatched) return true;
    }
    // next
    return next();
  }

  private async _check(options: IGuardOptionsUserName) {
    if (!options.name) return false;
    const user = this.bean.passport.getCurrentUser();
    if (!user || user.anonymous) return false;
    const userName = user.name as keyof IUserNameRecord;
    const optionsName = Array.isArray(options.name) ? options.name : [options.name];
    if (!optionsName.includes(userName)) return false;
    return true;
  }
}
