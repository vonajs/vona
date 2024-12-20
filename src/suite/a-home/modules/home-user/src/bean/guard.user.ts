import { BeanBase, Next } from 'vona';
import { Guard, IDecoratorGuardOptionsGlobal, IGuardExecute } from 'vona-module-a-aspect';

export interface IGuardOptionsUser extends IDecoratorGuardOptionsGlobal {
  public?: boolean;
}

@Guard<IGuardOptionsUser>({ global: true, public: false })
export class GuardUser extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsUser, next: Next): Promise<boolean> {
    if (!options.public && !this.bean.user.isAuthenticated) {
      //return false;
      return this.app.throw(401);
    }
    // next
    return next();
  }
}
