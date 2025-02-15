import type { Next } from 'vona';
import { BeanBase } from 'vona';
import type { IDecoratorGuardOptionsGlobal, IGuardExecute } from 'vona-module-a-aspect';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsPassport extends IDecoratorGuardOptionsGlobal {
  public: boolean;
}

@Guard<IGuardOptionsPassport>({ global: true, public: false })
export class GuardPassport extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsPassport, next: Next): Promise<boolean> {
    if (!this.bean.passport.getCurrent()) {
      await this.bean.passport.signinWithAnonymous();
    }
    if (!options.public && !this.bean.passport.isAuthenticated) {
      // return false;
      return this.app.throw(401);
    }
    // next
    return next();
  }
}
