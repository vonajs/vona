import type { IDecoratorPipeOptions, IPipeTransform } from 'vona-module-a-aspect';
import type { RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { ValidatorOptions } from '../types/validatorOptions.ts';
import { BeanBase, HttpStatus } from 'vona';
import { createArgumentPipe, Pipe } from 'vona-module-a-aspect';

export interface IPipeOptionsValid extends IDecoratorPipeOptions, ValidatorOptions {}

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
    }
    return value;
  }
}

export const valid = createArgumentPipe('a-validation:valid');
