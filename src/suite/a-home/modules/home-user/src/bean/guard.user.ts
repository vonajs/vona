import { BeanBase, Next } from 'vona';
import { Guard, IDecoratorGuardOptionsGlobal, IGuardExecute } from 'vona-module-a-aspect';

export interface IGuardOptionsUser extends IDecoratorGuardOptionsGlobal {
  public?: boolean;
}

@Guard<IGuardOptionsUser>({ global: true, public: false })
export class GuardUser extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsUser, next: Next): Promise<boolean> {
    // check user
    // todo: middleware.auth.ts
    if (!options.public) {
      // const user = this.ctx.state.user?.op;
      // if (!user || (user.id !== 0 && user.anonymous)) {
      //   //return false;
      //   return this.app.throw(401);
      // }
    }
    // next
    return next();
  }
}
