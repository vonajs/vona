import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IPipeTransform,
  Pipe,
  createArgumentPipeParse,
  isNil,
  isNumber,
} from 'vona';

export type IPipeOptionsDefaultValue = any;

@Pipe<IPipeOptionsDefaultValue>()
export class PipeDefaultValue extends BeanBase implements IPipeTransform<any, IPipeOptionsDefaultValue> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, options: IPipeOptionsDefaultValue) {
    if (isNil(value) || (isNumber(value) && isNaN(value as unknown as number)) || (value === '' && !isNil(options))) {
      return options;
    }
    return value;
  }
}

export const DefaultValuePipe = createArgumentPipeParse('a-pipe:defaultValue', true);
