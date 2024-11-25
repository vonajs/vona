import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IPipeTransform,
  Pipe,
  IDecoratorPipeOptionsGlobal,
  HttpStatus,
  Type,
  createArgumentPipe,
} from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { z } from 'zod';
import { ValidatorOptions } from '../lib/types/validatorOptions.js';

const __primitiveTypes = [String, Boolean, Number, Array, Object, Buffer, Date];
const __primitiveTypesTransform = [String, Boolean, Number, Date];

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
      return await this._transformPrimitive(value, metadata, options);
    }
    // validate
    return await this.bean.validator.validate(metaType, value, options, metadata.field);
  }

  private _isPrimitiveType(metaType: Type<any>): boolean {
    return __primitiveTypes.some(t => metaType === t);
  }

  private async _transformPrimitive(value: any, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsValidation) {
    const { metaType } = metadata;
    if (!__primitiveTypesTransform.includes(metaType as any)) return value;
    let rule: z.ZodSchema;
    if (metaType === String) {
      rule = z.string().optional();
    } else if (metaType === Number) {
      rule = z.number().optional();
    } else if (metaType === Boolean) {
      rule = z.boolean().optional();
    } else if (metaType === Date) {
      rule = z.date().optional();
    } else {
      // never go here
      rule = z.never();
    }
    // validateSchema
    return await this.bean.validator.validateSchema(rule, value, options, metadata.field);
  }
}

export const validation = createArgumentPipe('a-validator:validation');
