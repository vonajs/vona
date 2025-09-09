import type { IDecoratorZodRefineOptions, IZodRefineExecute, TypeRefinementCtx } from 'vona-module-a-zod';
import { BeanBase } from 'vona';
import { ZodRefine } from 'vona-module-a-zod';

export interface IZodRefineOptionsPasswordConfirm extends IDecoratorZodRefineOptions {}

@ZodRefine<IZodRefineOptionsPasswordConfirm>()
export class ZodRefinePasswordConfirm extends BeanBase implements IZodRefineExecute<any> {
  async execute(_value: any, _refinementCtx: TypeRefinementCtx, _options: IZodRefineOptionsPasswordConfirm) {}
}
