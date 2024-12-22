import { Bean } from 'vona-module-a-bean';
import { BeanBase, Constructable, HttpStatus, isNil } from 'vona';
import { z } from 'zod';
import { coerceWithNil } from '@cabloy/zod-query';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { schema } from 'vona-module-a-openapi';

@Bean()
export class BeanValidator extends BeanBase {
  async validate<T, V = T>(
    classType: Constructable<T>,
    value: V,
    options?: Partial<ValidatorOptions>,
    path?: string,
  ): Promise<V extends undefined ? undefined : V extends null ? null : T> {
    // const errorHttpStatusCode = options?.errorHttpStatusCode ?? HttpStatus.BAD_REQUEST;
    // check value: nil, maybe need other argument derecotor to validate it
    value = coerceWithNil(value);
    if (isNil(value)) return value as any;
    // // need not check value: primitive
    // if (this._isPrimitiveValue(value)) {
    //   this.app.throw(errorHttpStatusCode, this.scope.locale.ValidationFailedPipeValidationInvalidContent());
    // }
    // schema
    const _schema = schema(classType, options);
    return await this.validateSchema(_schema, value, options, path);
  }

  async validateSchema<T, V = T>(
    schema: z.ZodSchema<T> | undefined,
    value: V,
    options?: Partial<ValidatorOptions>,
    path?: string,
  ): Promise<V extends undefined ? undefined : V extends null ? null : T> {
    // no path
    if (!path) {
      return await this._validateSchema(schema, value, options);
    }
    // path
    const schema2 = z.object({ [path]: schema } as z.ZodRawShape);
    const obj = { [path]: value };
    const data = await this._validateSchema(schema2, obj, options);
    return data[path];
  }

  private async _validateSchema<T, V = T>(
    schema: z.ZodSchema<T> | undefined,
    value: V,
    options?: Partial<ValidatorOptions>,
  ): Promise<V extends undefined ? undefined : V extends null ? null : T> {
    const errorHttpStatusCode = options?.errorHttpStatusCode ?? HttpStatus.BAD_REQUEST;
    if (!schema) return value as any;
    const result = await schema?.safeParseAsync(value);
    if (result.success) return result.data as any;
    // error
    if (options?.disableErrorMessages) {
      this.app.throw(errorHttpStatusCode);
    }
    const issues = options?.exceptionFactory ? options.exceptionFactory(result.error) : result.error.issues;
    return this.app.throw(HttpStatus.UNPROCESSABLE_CONTENT, issues);
  }

  // private _isPrimitiveValue(value: unknown): boolean {
  //   return ['number', 'boolean', 'string'].includes(typeof value);
  // }
}
