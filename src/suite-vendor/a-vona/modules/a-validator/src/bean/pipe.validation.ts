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
    return await this.scope.service.validator.validate(metaType, value, options);
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
    // not field
    if (!metadata.field) {
      return await this.scope.service.validator.validateSchema(rule, value, options);
    }
    // field
    const key = metadata.field;
    const schema = z.object({ [key]: rule } as z.ZodRawShape);
    const obj = { [key]: value };
    const data = await this.scope.service.validator.validateSchema(schema, obj, options);
    return data[key];
  }
}

export const ValidationPipe = createArgumentPipeParse('a-validator:validation');
