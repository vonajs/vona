import type { Next } from 'vona';
import type { IDecoratorGuardOptions, IGuardExecute } from 'vona-module-a-aspect';
import { BeanBase } from 'vona';
import { Guard } from 'vona-module-a-aspect';

export interface IGuardOptionsAdmin extends IDecoratorGuardOptions {}

@Guard<IGuardOptionsAdmin>()
export class GuardAdmin extends BeanBase implements IGuardExecute {
  async execute(_options: IGuardOptionsAdmin, next: Next): Promise<boolean> {
    // next
    return next();
  }
}
