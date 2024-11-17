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
import { ValidationError } from '../types/validationError.js';

// const __primitiveTypes = [String, Boolean, Number, Array, Object, Buffer, Date];

export interface IPipeOptionsValidation extends IDecoratorPipeOptionsGlobal, ValidatorOptions {
  disableErrorMessages: boolean;
  errorHttpStatusCode: HttpStatus;
  exceptionFactory?: (errors: ValidationError[]) => any;
  expectedType?: Type<any>;
}

@Pipe<IPipeOptionsValidation>({
  global: true,
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_CONTENT,
  // ValidatorOptions
  passthrough: false,
  strict: false,
})
export class PipeValidation extends BeanBase<ScopeModule> implements IPipeTransform<any> {
  async transform(_value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsValidation) {
    // if (options.expectedType) {
    //   metadata = { ...metadata, metaType: options.expectedType };
    // }
    // const metaType = metadata.metaType;
    // // check type
    // if (!metaType) return value;
    // if (this._isPrimitiveType(metaType)) {
    //   return this._transformPrimitive(value, metadata);
    // }
    // // check value
    // if (this._isPrimitiveValue(value)) {
    //   this.$ctxUtil.throwValidationFailed(
    //     HttpStatus.BAD_REQUEST, // always 400
    //     this.scope.locale.ValidationFailedPipeValidationInvalidContent(),
    //     metadata,
    //   );
    // }
    // if (isNil(value)) {
    //   value = {};
    // }
    // this._stripProtoKeys(value);
    // // transform
    // const entity = plainToInstance(metaType, value, options.transformOptions);
    // // validate
    // const errors = await this._validate(entity, options.validatorOptions);
    // if (errors.length > 0) {
    //   const exceptionFactory =
    //     options.exceptionFactory ||
    //     (errors => {
    //       return this._flattenValidationErrors(errors);
    //     });
    //   const messages = exceptionFactory(errors);
    //   this.ctx.throw(options.errorHttpStatusCode, messages);
    // }
    // // ok
    // return entity;
  }

  // private _validate(
  //   object: object,
  //   validatorOptions?: ValidatorOptions,
  // ): Promise<ValidationError[]> | ValidationError[] {
  //   return validate(object, validatorOptions);
  // }

  // private _stripProtoKeys(value: any) {
  //   if (value == null || typeof value !== 'object' || types.isTypedArray(value)) {
  //     return;
  //   }
  //   if (Array.isArray(value)) {
  //     for (const v of value) {
  //       this._stripProtoKeys(v);
  //     }
  //     return;
  //   }
  //   delete value.__proto__;
  //   for (const key in value) {
  //     this._stripProtoKeys(value[key]);
  //   }
  // }

  // private _isPrimitiveType(metaType: Type<any>): boolean {
  //   return __primitiveTypes.some(t => metaType === t);
  // }

  // private _isPrimitiveValue(value: unknown): boolean {
  //   return ['number', 'boolean', 'string'].includes(typeof value);
  // }

  // private _transformPrimitive(value: any, metadata: RouteHandlerArgumentMeta) {
  //   if (!metadata.field) {
  //     // leave top-level query/param objects unmodified
  //     return value;
  //   }
  //   const { type, metaType } = metadata;
  //   if (type !== 'param' && type !== 'query') {
  //     return value;
  //   }
  //   if (metaType === Boolean) {
  //     if (isUndefined(value)) {
  //       // This is an workaround to deal with optional boolean values since
  //       // optional booleans shouldn't be parsed to a valid boolean when
  //       // they were not defined
  //       return undefined;
  //     }
  //     // Any fasly value but `undefined` will be parsed to `false`
  //     return value === true || value === 'true';
  //   }
  //   if (metaType === Number) {
  //     return value === '' ? parseInt(value) : +value;
  //   }
  //   return value;
  // }

  // private _flattenValidationErrors(validationErrors: ValidationError[]): string[] {
  //   return iterate(validationErrors)
  //     .map(error => this._mapChildrenToValidationErrors(error))
  //     .flatten()
  //     .filter(item => !!item.constraints)
  //     .map(item => Object.values(item.constraints!))
  //     .flatten()
  //     .toArray();
  // }

  // private _mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {
  //   if (!(error.children && error.children.length)) {
  //     return [error];
  //   }
  //   const validationErrors: ValidationError[] = [];
  //   parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  //   for (const item of error.children) {
  //     if (item.children && item.children.length) {
  //       validationErrors.push(...this._mapChildrenToValidationErrors(item, parentPath));
  //     }
  //     validationErrors.push(this._prependConstraintsWithParentProp(parentPath, item));
  //   }
  //   return validationErrors;
  // }

  // private _prependConstraintsWithParentProp(parentPath: string, error: ValidationError): ValidationError {
  //   const constraints = {};
  //   for (const key in error.constraints) {
  //     constraints[key] = `${parentPath}.${error.constraints[key]}`;
  //   }
  //   return {
  //     ...error,
  //     constraints,
  //   };
  // }
}

export const ValidationPipe = createArgumentPipeParse('a-validator:validation');
