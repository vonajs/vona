import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IDecoratorPipeOptions,
  IPipeTransform,
  Pipe,
  createArgumentPipeParse,
} from 'vona';

export interface IPipeOptionsDefaultValue extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsDefaultValue>()
export class PipeDefaultValue extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsDefaultValue) {
    return value;
  }
}

export const DefaultValuePipe = createArgumentPipeParse('a-pipe:defaultValue');
