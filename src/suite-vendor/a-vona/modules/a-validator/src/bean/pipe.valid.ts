import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IDecoratorPipeOptions,
  IPipeTransform,
  Pipe,
  createArgumentPipeParse,
} from 'vona';

export interface IPipeOptionsValid extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsValid>()
export class PipeValid extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsValid) {
    return value;
  }
}

export const ValidPipe = createArgumentPipeParse('a-validator:valid');
