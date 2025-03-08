import type { Next } from 'vona';
import type { IDecoratorGuardOptionsGlobal, IGuardExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsPassport extends IDecoratorGuardOptionsGlobal {
  public: boolean;
  jwt: boolean;
}

@Guard<IGuardOptionsPassport>({ global: true, public: false, jwt: true })
export class GuardPassport extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsPassport, next: Next): Promise<boolean> {
    // jwt
    if (!options.public && options.jwt) {

    }
    // check current
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
