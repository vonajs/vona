import type { Next } from 'vona';
import type { IDecoratorGuardOptionsGlobal, IGuardExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsPassport extends IDecoratorGuardOptionsGlobal {
  public: boolean;
  checkAuthToken: boolean; // default is true
  forceAuthToken: boolean;
}

@Guard<IGuardOptionsPassport>({ global: true, public: false, checkAuthToken: true, forceAuthToken: false })
export class GuardPassport extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsPassport, next: Next): Promise<boolean> {
    // auth token
    if (!this.bean.passport.getCurrent()) {
      if ((!options.public && options.checkAuthToken) || options.forceAuthToken) {
        await this.bean.passport.checkAuthToken();
      }
    }
    // check current
    if (!this.bean.passport.getCurrent()) {
      await this.bean.passport.signinWithAnonymous();
    }
    if (!options.public && !this.bean.passport.isAuthenticated) {
      // return false;
      // 401 for this guard,403 for the next guards
      return this.app.throw(401);
    }
    // check innerAccess
    if (this.ctx.innerAccess) return true;
    // next
    return next();
  }
}
