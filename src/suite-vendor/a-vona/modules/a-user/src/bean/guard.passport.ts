import { BeanBase, Next } from 'vona';
import { Guard, IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';

export interface IGuardOptionsPassport extends IDecoratorGuardOptions {}

@Guard<IGuardOptionsPassport>()
export class GuardPassport extends BeanBase implements IGuardExecute {
  async execute(_options: IGuardOptionsPassport, next: Next): Promise<boolean> {
    // next
    return next();
  }
}
