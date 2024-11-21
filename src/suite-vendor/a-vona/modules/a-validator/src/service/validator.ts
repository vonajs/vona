import { appMetadata, BeanBase, Constructable, HttpStatus, isNil, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { SymbolDecoratorRule } from '../decorator/rule.js';
import { coerceWithNil } from '@cabloy/zod-query';

@Service()
export class ServiceValidator extends BeanBase<ScopeModule> {
  async validate<T, V = T>(
    classType: Constructable<T>,
    value: V,
    options?: ValidatorOptions,
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
    const schema = this.getSchema(classType, options);
    return await this.validateSchema(schema, value, options, path);
  }

  async validateSchema<T, V = T>(
    schema: z.ZodSchema<T> | undefined,
    value: V,
    options?: ValidatorOptions,
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

  getSchema<T>(classType: Constructable<T>, options?: ValidatorOptions): z.ZodSchema<T> | undefined {
    const rules = appMetadata.getMetadata(SymbolDecoratorRule, classType.prototype);
    let schema = z.object((rules as z.ZodRawShape) || {});
    if (options?.passthrough) schema = schema.passthrough() as any;
    if (options?.strict) schema = schema.strict() as any;
    return schema as any;
  }

  async _validateSchema<T, V = T>(
    schema: z.ZodSchema<T> | undefined,
    value: V,
    options?: ValidatorOptions,
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
