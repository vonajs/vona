import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IPipeTransform,
  Pipe,
  IDecoratorPipeOptionsGlobal,
  HttpStatus,
  Type,
  createArgumentPipeParse,
  isUndefined,
  isNil,
} from 'vona';
import { types } from 'node:util';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { ClassTransformOptions } from '../types/classTransformOptions.js';
import { ScopeModule } from '../.metadata/this.js';
import { ValidationError } from '../types/validationError.js';

const __primitiveTypes = [String, Boolean, Number, Array, Object, Buffer, Date];

export interface IPipeOptionsValidation extends IDecoratorPipeOptionsGlobal {
  disableErrorMessages: boolean;
  errorHttpStatusCode: HttpStatus;
  expectedType?: Type<any>;
  validatorOptions: ValidatorOptions;
  transformOptions: ClassTransformOptions;
}

@Pipe<IPipeOptionsValidation>({
  global: true,
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  //
  validatorOptions: {
    enableDebugMessages: false,
    skipUndefinedProperties: false,
    skipNullProperties: false,
    skipMissingProperties: false,
    whitelist: false,
    forbidNonWhitelisted: false,
    forbidUnknownValues: false,
    groups: undefined,
    always: false,
    strictGroups: false,
    dismissDefaultMessages: false,
    validationError: {
      target: false,
      value: false,
    },
    stopAtFirstError: false,
  },
  transformOptions: {
    strategy: 'exposeAll',
    ignoreDecorators: false,
    enableCircularCheck: false,
    enableImplicitConversion: false,
    excludeExtraneousValues: false,
    exposeDefaultValues: false,
    exposeUnsetFields: false,
  },
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

    // check value
    if (this._isPrimitiveValue(value)) {
      this.$ctxUtil.throwValidationFailed(
        HttpStatus.BAD_REQUEST, // always 400
        this.scope.locale.ValidationFailedPipeValidationInvalidContent(),
        metadata,
      );
    }
    if (isNil(value)) {
      value = {}; // maybe transform some default values
    }
    this._stripProtoKeys(value);

    // transform
    const entity = plainToInstance(metaType, value, options.transformOptions);

    // validate
    const errors = await this._validate(entity, options.validatorOptions);
    if (errors.length > 0) {
      // todo: throw error
      //throw await this.exceptionFactory(errors);
    }

    // ok
    return entity;
  }

  private _validate(
    object: object,
    validatorOptions?: ValidatorOptions,
  ): Promise<ValidationError[]> | ValidationError[] {
    return validate(object, validatorOptions);
  }

  private _stripProtoKeys(value: any) {
    if (value == null || typeof value !== 'object' || types.isTypedArray(value)) {
      return;
    }
    if (Array.isArray(value)) {
      for (const v of value) {
        this._stripProtoKeys(v);
      }
      return;
    }
    delete value.__proto__;
    for (const key in value) {
      this._stripProtoKeys(value[key]);
    }
  }

  private _isPrimitiveType(metaType: Type<any>): boolean {
    return __primitiveTypes.some(t => metaType === t);
  }

  private _isPrimitiveValue(value: unknown): boolean {
    return ['number', 'boolean', 'string'].includes(typeof value);
  }

  private _transformPrimitive(value: any, metadata: RouteHandlerArgumentMeta) {
    if (!metadata.field) {
      // leave top-level query/param objects unmodified
      return value;
    }
    const { type, metaType } = metadata;
    if (type !== 'param' && type !== 'query') {
      return value;
    }
    if (metaType === Boolean) {
      if (isUndefined(value)) {
        // This is an workaround to deal with optional boolean values since
        // optional booleans shouldn't be parsed to a valid boolean when
        // they were not defined
        return undefined;
      }
      // Any fasly value but `undefined` will be parsed to `false`
      return value === true || value === 'true';
    }
    if (metaType === Number) {
      return value === '' ? parseInt(value) : +value;
    }
    return value;
  }
}

export const ValidationPipe = createArgumentPipeParse('a-validator:validation');
