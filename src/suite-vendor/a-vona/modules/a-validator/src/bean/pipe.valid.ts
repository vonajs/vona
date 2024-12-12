import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IDecoratorPipeOptions,
  IPipeTransform,
  Pipe,
  createArgumentPipe,
  Constructable,
  HttpStatus,
} from 'vona';
import { z } from 'zod';
import { ValidatorOptions } from '../lib/types/validatorOptions.js';

export interface IPipeOptionsValid extends IDecoratorPipeOptions, ValidatorOptions {
  schema?: z.ZodSchema;
  class?: Constructable;
}

@Pipe<IPipeOptionsValid>({
  // ValidatorOptions
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  passthrough: false,
  strict: false,
})
export class PipeValid extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsValid) {
    if (options.schema) {
      // validateSchema
      return await this.bean.validator.validateSchema(options.schema, value, options, metadata.field);
    } else if (options.class) {
      // validate
      return await this.bean.validator.validate(options.class, value, options, metadata.field);
    }
    return value;
  }
}

export const valid = createArgumentPipe('a-validator:valid');
