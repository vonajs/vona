import { appMetadata, BeanBase, Constructable, HttpStatus, isNil, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { SymbolDecoratorRule } from '../decorator/rule.js';

@Service()
export class ServiceValidator extends BeanBase<ScopeModule> {
  async validate<T, V = T>(
    classType: Constructable<T>,
    value: V,
    options?: ValidatorOptions,
  ): Promise<V extends undefined ? undefined : V extends null ? null : T> {
    // check value: nil, maybe need other argument derecotor to validate it
    if (isNil(value)) return value as any;
    // check value: primitive
    if (this._isPrimitiveValue(value)) {
      this.ctx.throw(
        HttpStatus.BAD_REQUEST, // always 400
        this.scope.locale.ValidationFailedPipeValidationInvalidContent(),
      );
    }
    // schema
    const objectSchema = this.getSchema(classType, options);
    if (!objectSchema) return value as any;
    const result = await objectSchema?.safeParseAsync(value);
    if (result.success) return result.data as any;
    // error
    if (options?.disableErrorMessages) {
      this.ctx.throw(HttpStatus.BAD_REQUEST);
    }
    const issues = options?.exceptionFactory ? options.exceptionFactory(result.error) : result.error.issues;
    this.ctx.throw(options?.errorHttpStatusCode ?? HttpStatus.UNPROCESSABLE_CONTENT, issues);
  }

  getSchema<T>(classType: Constructable<T>, options?: ValidatorOptions): z.ZodSchema<T> | undefined {
    const rules = appMetadata.getMetadata(SymbolDecoratorRule, classType.prototype);
    let schema = z.object((rules as z.ZodRawShape) || {});
    if (options?.passthrough) schema = schema.passthrough() as any;
    if (options?.strict) schema = schema.strict() as any;
    return schema as any;
  }

  private _isPrimitiveValue(value: unknown): boolean {
    return ['number', 'boolean', 'string'].includes(typeof value);
  }
}
