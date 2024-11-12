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
  HttpStatus,
} from 'vona';
import { ScopeModule } from '../.metadata/this.js';

export interface IPipeOptionsParseInt extends IDecoratorPipeOptions {
  optional: boolean;
  errorHttpStatusCode: HttpStatus;
}

@Pipe<IPipeOptionsParseInt>({ optional: false, errorHttpStatusCode: HttpStatus.BAD_REQUEST })
export class PipeParseInt extends BeanBase<ScopeModule> implements IPipeTransform {
  async transform(value, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsParseInt) {
    if (isNil(value) && options.optional) {
      return value;
    }
    if (!this.isNumeric(value)) {
      this.$ctxUtil.throwValidationFailed(
        options.errorHttpStatusCode,
        this.scope.locale.ValidationFailedPipeParseInt,
        this.scope.locale.ValidationFailedPipeParseIntDev,
        metadata.method,
        metadata.index,
      );
    }
    return parseInt(value, 10);
  }

  protected isNumeric(value: string): boolean {
    return ['string', 'number'].includes(typeof value) && /^-?\d+$/.test(value) && isFinite(value as any);
  }
}

export function ParseIntPipe(): ArgumentPipeResult<'a-pipe:parseInt'>;
export function ParseIntPipe(options: Partial<IPipeOptionsParseInt>): ArgumentPipeResultFn<'a-pipe:parseInt'>;
export function ParseIntPipe(options?: Partial<IPipeOptionsParseInt>): any {
  if (!options) return createArgumentPipe('a-pipe:parseInt');
  return () => {
    return createArgumentPipe('a-pipe:parseInt', options);
  };
}
