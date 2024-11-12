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
import { ScopeModule } from '../.metadata/this.js';

export interface IPipeOptionsParseInt extends IDecoratorPipeOptions {
  optional?: boolean;
}

@Pipe<IPipeOptionsParseInt>()
export class PipeParseInt extends BeanBase<ScopeModule> implements IPipeTransform {
  async transform(value, _metadata: RouteHandlerArgumentMeta, options: IPipeOptionsParseInt) {
    if (isNil(value) && options?.optional) {
      return value;
    }
    if (!this.isNumeric(value)) {
      if (this.app.meta.isProd) {
        this.ctx.throw(422, this.scope.locale.ValidationFailedPipeParseInt());
      } else {
        //this.ctx.throw(422, this.scope.locale.ValidationFailedPipeParseIntDev(metadata.));
      }
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
