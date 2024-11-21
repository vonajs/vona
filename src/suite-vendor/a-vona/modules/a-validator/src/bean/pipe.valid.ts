import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IDecoratorPipeOptions,
  IPipeTransform,
  Pipe,
  createArgumentPipeParse,
  Constructable,
} from 'vona';
import { z } from 'zod';

export interface IPipeOptionsValid extends IDecoratorPipeOptions {
  schema?: z.ZodSchema;
  class?: Constructable;
}

@Pipe<IPipeOptionsValid>()
export class PipeValid extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsValid) {
    return value;
  }
}

export const ValidPipe = createArgumentPipeParse('a-validator:valid');
