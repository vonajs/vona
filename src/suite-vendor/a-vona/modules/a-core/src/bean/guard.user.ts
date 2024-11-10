import { BeanBase, Guard, IDecoratorGuardOptions, IGuardExecute, Next } from 'vona';

export interface IGuardOptionsUser extends IDecoratorGuardOptions {
  public?: boolean;
}

@Guard<IGuardOptionsUser>({ public: false })
export class GuardUser extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsUser, next: Next) {
    // check user
    if (!options.public) {
      const user = this.ctx.state.user?.op;
      if (!user || (user.id !== 0 && user.anonymous)) return false;
    }
    // next
    return next();
  }
}
