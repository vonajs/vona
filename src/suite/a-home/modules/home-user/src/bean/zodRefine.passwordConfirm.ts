import type { IDecoratorZodRefineOptions, IZodRefineExecute, TypeRefinementCtx } from 'vona-module-a-zod';
import { BeanBase } from 'vona';
import { ZodRefine } from 'vona-module-a-zod';
import z from 'zod';

interface IZodRefinePasswordConfirmValue { password: string; passwordConfirm: string }

export interface IZodRefineOptionsPasswordConfirm extends IDecoratorZodRefineOptions {}

@ZodRefine<IZodRefineOptionsPasswordConfirm>()
export class ZodRefinePasswordConfirm extends BeanBase implements IZodRefineExecute<IZodRefinePasswordConfirmValue> {
  async execute(value: IZodRefinePasswordConfirmValue, refinementCtx: TypeRefinementCtx, _options: IZodRefineOptionsPasswordConfirm) {
    if (value.password !== value.passwordConfirm) {
      refinementCtx.addIssue({
        code: z.ZodIssueCode.custom,
        message: this.scope.locale.PasswordsNotMatch(),
        fatal: true,
        path: ['passwordConfirm'],
      });
    }
  }
}
