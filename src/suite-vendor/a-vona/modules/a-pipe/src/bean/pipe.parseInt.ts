import { RouteHandlerArgumentMeta, BeanBase, IDecoratorPipeOptions, IPipeTransform, Pipe } from 'vona';

export interface IPipeOptionsParseInt extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsParseInt>({})
export class PipeParseInt extends BeanBase implements IPipeTransform {
  async transform(value, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsParseInt) {
    return value;
  }
}
