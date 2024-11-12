import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IDecoratorPipeOptions,
  IPipeTransform,
  Pipe,
  createArgumentPipe,
} from 'vona';

export interface IPipeOptionsParseInt extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsParseInt>()
export class PipeParseInt extends BeanBase implements IPipeTransform {
  async transform(value, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsParseInt) {
    _options;
    return value;
  }
}

export function ParseIntPipe(options?: IPipeOptionsParseInt) {
  if (!options) return createArgumentPipe('a-pipe:parseInt');
  return () => {
    return createArgumentPipe('a-pipe:parseInt', options);
  };
}
