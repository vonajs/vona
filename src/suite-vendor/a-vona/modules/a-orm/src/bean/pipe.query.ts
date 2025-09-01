import type { IDecoratorPipeOptions, IPipeTransform } from 'vona-module-a-aspect';
import type { RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import { BeanBase } from 'vona';
import { createArgumentPipe, Pipe } from 'vona-module-a-aspect';

export interface IPipeOptionsQuery extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsQuery>()
export class PipeQuery extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsQuery) {
    return value + 1;
  }
}

export const ArgQuery = createArgumentPipe('a-orm:query');
