import type { IDecoratorZodRefineOptions, IZodRefineExecute, TypeRefinementCtx } from 'vona-module-a-zod';
import { BeanBase } from 'vona';
import { ZodRefine } from 'vona-module-a-zod';

export interface IZodRefineOptionsUsernameUnique extends IDecoratorZodRefineOptions {}

@ZodRefine<IZodRefineOptionsUsernameUnique>()
export class ZodRefineUsernameUnique extends BeanBase implements IZodRefineExecute<any> {
  async execute(_value: any, _refinementCtx: TypeRefinementCtx, _options: IZodRefineOptionsUsernameUnique) {}
}
