import type { IDecoratorZodRefineOptions, IZodRefineExecute, TypeRefinementCtx } from 'vona-module-a-zod';
import { BeanBase } from 'vona';
import { ZodRefine } from 'vona-module-a-zod';

export interface IZodRefineOptionsUsernameUnique extends IDecoratorZodRefineOptions {}

@ZodRefine<IZodRefineOptionsUsernameUnique>()
export class ZodRefineUsernameUnique extends BeanBase implements IZodRefineExecute<string> {
  async execute(value: string, refinementCtx: TypeRefinementCtx, _options: IZodRefineOptionsUsernameUnique) {
    const user = await this.bean.userInner.findOneByName(value);
    if (user) {
      refinementCtx.addIssue({
        code: 'custom',
        message: this.scope.locale.UsernameExists(),
      });
    }
  }
}
