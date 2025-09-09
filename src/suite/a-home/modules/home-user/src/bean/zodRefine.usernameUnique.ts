import type { IDecoratorPipeOptions } from 'vona-module-a-aspect';
import type { RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { IZodRefineExecute } from 'vona-module-a-zod';
import { BeanBase } from 'vona';
import { Pipe } from 'vona-module-a-aspect';

export interface IPipeOptionsUsernameUnique extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsUsernameUnique>()
export class ZodRefineUsernameUnique extends BeanBase implements IZodRefineExecute<any> {
  async execute(value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsUsernameUnique) {
    return value;
  }
}
