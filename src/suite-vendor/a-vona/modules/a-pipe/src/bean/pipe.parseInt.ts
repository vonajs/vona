import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IDecoratorPipeOptions,
  IPipeTransform,
  Pipe,
  createArgumentPipe,
  isNil,
  ArgumentPipeResult,
  ArgumentPipeResultFn,
} from 'vona';

export interface IPipeOptionsParseInt extends IDecoratorPipeOptions {
  optional?: boolean;
}

@Pipe<IPipeOptionsParseInt>()
export class PipeParseInt extends BeanBase implements IPipeTransform {
  async transform(value, _metadata: RouteHandlerArgumentMeta, options: IPipeOptionsParseInt) {
    if (isNil(value) && options?.optional) {
      return value;
    }
    if (!this.isNumeric(value)) {
      this.ctx.throw(422); // Validation failed (numeric string is expected)'
    }
    return parseInt(value, 10);
  }

  protected isNumeric(value: string): boolean {
    return ['string', 'number'].includes(typeof value) && /^-?\d+$/.test(value) && isFinite(value as any);
  }
}

export function ParseIntPipe(): ArgumentPipeResult<'a-pipe:parseInt'>;
export function ParseIntPipe(options: IPipeOptionsParseInt): ArgumentPipeResultFn<'a-pipe:parseInt'>;
export function ParseIntPipe(options?: IPipeOptionsParseInt): any {
  if (!options) return createArgumentPipe('a-pipe:parseInt');
  return () => {
    return createArgumentPipe('a-pipe:parseInt', options);
  };
}
