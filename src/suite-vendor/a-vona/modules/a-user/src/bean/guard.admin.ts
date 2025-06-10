import type { Next } from 'vona';
import type { IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsAdmin extends IDecoratorGuardOptions {
  admin: boolean;
  passWhenMatched: boolean;
}

@Guard<IGuardOptionsAdmin>({ admin: true, passWhenMatched: true })
export class GuardAdmin extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsAdmin, next: Next): Promise<boolean> {
    if (options.admin) {
      const isAdmin = await this.bean.passport.isAdmin();
      if (!isAdmin) return this.app.throw(403);
      if (options.passWhenMatched) return true;
    }
    // next
    return next();
  }
}
