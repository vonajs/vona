import type { Next } from 'vona';
import type { IDecoratorGuardOptionsGlobal, IGuardExecute } from 'vona-module-a-aspect';
import { catchError } from '@cabloy/utils';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsPassport extends IDecoratorGuardOptionsGlobal {
  public: boolean;
  checkAuthToken: boolean; // default is true
}

@Guard<IGuardOptionsPassport>({ global: true, public: false, checkAuthToken: true })
export class GuardPassport extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsPassport, next: Next): Promise<boolean> {
    // auth token
    if (!this.bean.passport.getCurrent()) {
      if (options.checkAuthToken) {
        // will return undefined if no accessToken, so not check options.public
        const [_, err] = await catchError(() => {
          return this.bean.passport.checkAuthToken();
        });
        if (err && !options.public) throw err;
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
