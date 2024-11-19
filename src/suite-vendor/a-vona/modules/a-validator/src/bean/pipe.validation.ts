import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IPipeTransform,
  Pipe,
  IDecoratorPipeOptionsGlobal,
  HttpStatus,
  Type,
  createArgumentPipeParse,
} from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { ScopeModule } from '../.metadata/this.js';
import { z } from 'zod';

const __primitiveTypes = [String, Boolean, Number, Array, Object, Buffer, Date];

export interface IPipeOptionsValidation extends IDecoratorPipeOptionsGlobal, ValidatorOptions {
  expectedType?: Type<any>;
}

@Pipe<IPipeOptionsValidation>({
  global: true,
  // ValidatorOptions
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  passthrough: false,
  strict: false,
})
export class PipeValidation extends BeanBase<ScopeModule> implements IPipeTransform<any> {
  async transform(value: any, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsValidation) {
    if (options.expectedType) {
      metadata = { ...metadata, metaType: options.expectedType };
    }
    const metaType = metadata.metaType;
    // check type
    if (!metaType) return value;
    if (this._isPrimitiveType(metaType)) {
      return this._transformPrimitive(value, metadata);
    }
    // validate
    return await this.scope.service.validator.validate(metaType, value, options);
  }

  private _isPrimitiveType(metaType: Type<any>): boolean {
    return __primitiveTypes.some(t => metaType === t);
  }

  private _transformPrimitive(value: any, metadata: RouteHandlerArgumentMeta) {
    const { metaType } = metadata;
    if (metaType === String) {
      return z.string().parse(value);
    } else if (metaType === Number) {
      return z.number().parse(value);
    } else if (metaType === Boolean) {
      return z.boolean().parse(value);
    } else if (metaType === Date) {
      return z.date().parse(value);
    }
    return value;
  }
}

export const ValidationPipe = createArgumentPipeParse('a-validator:validation');
