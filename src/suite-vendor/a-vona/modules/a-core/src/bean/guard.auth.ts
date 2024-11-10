import { BeanBase, Guard, IDecoratorGuardOptions, IGuardExecute, Next } from 'vona';

export interface IGuardOptionsAuth extends IDecoratorGuardOptions {
  public?: boolean;
}

@Guard<IGuardOptionsAuth>({ public: false })
export class GuardAuth extends BeanBase implements IGuardExecute {
  async execute(options: IGuardOptionsAuth, next: Next) {
    // check user
    if (!options.public) {
      const user = this.ctx.state.user?.op;
      if (!user || (user.id !== 0 && user.anonymous)) return false;
    }
    // next
    return next();
  }
}
