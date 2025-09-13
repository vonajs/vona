import type { IDecoratorZodRefineOptions, IZodRefineExecute, TypeRefinementCtx } from 'vona-module-a-zod';
import { BeanBase } from 'vona';
import { ZodRefine } from 'vona-module-a-zod';

export interface IZodRefineOptionsEmailUnique extends IDecoratorZodRefineOptions {}

@ZodRefine<IZodRefineOptionsEmailUnique>()
export class ZodRefineEmailUnique extends BeanBase implements IZodRefineExecute<string> {
  async execute(value: string, refinementCtx: TypeRefinementCtx, _options: IZodRefineOptionsEmailUnique) {
    const user = await this.scope.model.user.get({ email: { _eqI_: value } });
    if (user) {
      refinementCtx.addIssue({
        code: 'custom',
        message: this.scope.locale.EmailExists(),
      });
    }
  }
}
